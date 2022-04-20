const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./user_test_helper')
const app = require('../app')

const api = supertest(app)

const User = require('../models/user')
const {usersInDB, nonExistingId} = require("./user_test_helper");

const initialUsers = helper.initialUsers

// clear all document in DB and populate with the data set
beforeEach( async () => {
    await User.deleteMany({})
    for (const user of initialUsers) {
        let userObj = new User(user)
        await userObj.save()
    }
})

describe('HTTP GET testing', () => {
    test('users are returned as json', async () => {
        await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('returned user number is correct', async () => {
        const response = await api.get('/api/users')
        expect(response.body).toHaveLength(initialUsers.length)
    })

    test('id property exists', async () => {
        const response = await api.get('/api/users')
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({id: expect.any(String)})
            ])
        )
    })

    test('password is not displayed', async () => {
        const response = await api.get('/api/users')
        for (const obj of response.body) {
            expect(obj.passwordHash).toBeUndefined
        }
    })
})

describe('HTTP POST testing', () => {
    test('new user post is successfully added', async () => {
        const newUser = {
            'username': 'newuser',
            'name': 'name',
            'password': 'password'
        }

        await api.post('/api/users').send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const resultedUsers = await helper.usersInDB()
        expect(resultedUsers).toHaveLength(initialUsers.length + 1)
    })

    test('user without a password is not added', async () => {
        const newUser = {
            'username': 'newuser'
        }

        await api.post('/api/users').send(newUser)
            .expect(400)

        const resultedUsers = await helper.usersInDB()
        expect(resultedUsers).toHaveLength(initialUsers.length)
    })

    test('adding a user with existing username throws 400 error', async () => {
        const newUser = initialUsers[0]

        await api.post('/api/users').send(newUser)
            .expect(400)

        const resultedUsers = await helper.usersInDB()
        expect(resultedUsers).toHaveLength(initialUsers.length)
    })

    test('adding a user with username less than 3 chars throws 400 error', async () => {
        const newUser = {
            'username': 'x',
            'name': 'test name',
            'password': "xxxx"
        }

        await api.post('/api/users').send(newUser)
            .expect(400)

        const resultedUsers = await helper.usersInDB()
        expect(resultedUsers).toHaveLength(initialUsers.length)
    })

    test('adding a user with password less than 3 chars throws 400 error', async () => {
        const newUser = {
            'username': 'testname',
            'name': 'test name',
            'password': "x"
        }

        await api.post('/api/users').send(newUser)
            .expect(400)

        const resultedUsers = await helper.usersInDB()
        expect(resultedUsers).toHaveLength(initialUsers.length)
    })
})

// describe('HTTP DELETE testing', () => {
//     test('blog is deleted successfully', async () => {
//         const blogsAtStart = await blogsInDB()
//         const blogToDelete = blogsAtStart[0]
//         await api.delete(`/api/blogs/${blogToDelete.id}`)
//             .expect(204)
//
//         const blogsAtEnd = await blogsInDB()
//         expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
//     })
//
//     test('blog with none-existing id throws a 404 error', async () => {
//         const id = await nonExistingId()
//         await api.delete(`/api/blogs/${id}`)
//             .expect(404)
//
//         const blogsAtEnd = await blogsInDB()
//         expect(blogsAtEnd).toHaveLength(initialBlogs.length)
//     })
//
//     test('blog with invalid id throws a 400 error', async () => {
//         const invalidId = '555'
//         await api.delete(`/api/blogs/${invalidId}`)
//             .expect(400)
//
//         const blogsAtEnd = await blogsInDB()
//         expect(blogsAtEnd).toHaveLength(initialBlogs.length)
//     })
//
// })
//
// describe('HTTP PUT testing', () => {
//     test('likes value is updated successfully', async () => {
//         const blogsAtStart = await blogsInDB()
//         const blogToUpdate = blogsAtStart[0]
//         const valueToUpdate = {'likes': 50}
//         await api.put(`/api/blogs/${blogToUpdate.id}`).send(valueToUpdate)
//             .expect(200)
//             .expect('Content-Type', /application\/json/)
//             .expect(res => {
//                 res.body.likes = valueToUpdate.likes
//             })
//     })
//
//     test('blog with invalid id throws 400 error', async () => {
//         const invalidId = '555'
//         const valueToUpdate = {'likes': 50}
//         await api.put(`/api/blogs/${invalidId}`).send(valueToUpdate)
//             .expect(400)
//             .expect(res => {
//                 res.body.error = 'id format is incorrect'
//             })
//     })
// })


afterAll(() => {
    mongoose.connection.close()
})

