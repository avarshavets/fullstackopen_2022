const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./blog_test_helper')
const helperUser = require('./user_test_helper')
const app = require('../app')

// Supertest starts the application with a purpose to test HTTP server:
// if the server is not already listening for connections then
// it is bound to an ephemeral port for you so there is no need to keep track of ports.
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

const { initialBlogs, blogsInDB, nonExistingId } = require("./blog_test_helper");

let userAuth = ''

// create user and log user in to authorize to perform operation with blogs
beforeAll(async () => {
    await User.deleteMany({})
    const user = {
        'username': 'MichelSmith',
        'password': 'mSmithPsw',
    }
    // add user to the DB by using API (we need hashed password created in API!)
    await api.post('/api/users').send(user)
    await api.post('/api/login').send(user).then(res => {
        userAuth = res.body.token
    })
})

let request;
beforeEach( async () => {
    await Blog.deleteMany({})
    for (const blog of initialBlogs) {
        let blogObj = new Blog(blog)
        await blogObj.save()
    }
    request = supertest.agent(`http://localhost:${process.env.PORT}`)
        .set('Authorization', `Bearer ${userAuth}`)
})

describe('HTTP GET testing', () => {
    test('blogs are returned as json', async () => {
        await request
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('returned blog number is correct', async () => {
        const response = await api
            .get('/api/blogs')
            .set('Authorization', `Bearer ${userAuth}`)
        expect(response.body).toHaveLength(initialBlogs.length)
    })


    test('id property exists', async () => {
        const response = await request.get('/api/blogs')
        for (const obj of response.body) {
            expect(obj.id).toBeUndefined
        }
    })
})

describe('HTTP POST testing', () => {
    test('new blog post is successfully added', async () => {
        const usersAtStart = await helperUser.usersInDB()
        const currentUser = usersAtStart[0]

        const newBlog = {
            'title': 'new title',
            'author': 'new author',
            'url': 'new url',
            'likes': 10,
            'user': currentUser.id
        }

        await request.post('/api/blogs').send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const resultedBlogs = await helper.blogsInDB()
        expect(resultedBlogs).toHaveLength(initialBlogs.length + 1)
        const addedBlog = resultedBlogs[resultedBlogs.length - 1]

        // blog id is added to the current user blogs array
        currentUser.blogs.map(blog => {
            expect(blog).toContain(addedBlog.id)
        })
    })

    test('blog post by unauthorized user throws 401 error', async () => {
        const usersAtStart = await helperUser.usersInDB()
        const currentUser = usersAtStart[0]
        const newBlog = {
            'title': 'new title',
            'author': 'new author',
            'url': 'new url',
            'likes': 10,
            'user': currentUser._id
        }

        await api.post('/api/blogs').send(newBlog)
            .expect(401)    // token is not provided!

        const resultedBlogs = await helper.blogsInDB()
        expect(resultedBlogs).toHaveLength(initialBlogs.length)
    })

    test('blog without likes has default likes = 0', async () => {
        const usersAtStart = await helperUser.usersInDB()
        const currentUser = usersAtStart[0]

        const newBlog = {
            'title': 'new title',
            'author': 'new author',
            'url': 'new url',
            'user': currentUser.id
        }

        await request.post('/api/blogs').send(newBlog)
            .expect(201)

        const resultedBlogs = await helper.blogsInDB()
        expect(resultedBlogs).toHaveLength(initialBlogs.length + 1)
        const addedBlog = resultedBlogs[resultedBlogs.length - 1]
        expect(addedBlog.likes).toBe(0)
        })


    test('blog without a title / url is not added', async () => {
        const usersAtStart = await helperUser.usersInDB()
        const currentUser = usersAtStart[0]

        const newBlog = {
            'author': 'new author',
            'likes': 10,
            'user': currentUser.id
        }

        await request.post('/api/blogs').send(newBlog)
            .expect(400)

        const resultedBlogs = await helper.blogsInDB()
        expect(resultedBlogs).toHaveLength(initialBlogs.length)
    })
})

describe('HTTP DELETE testing', () => {
    test('blog is deleted successfully', async () => {
        const blogsAtStart = await blogsInDB()
        const blogToDelete = blogsAtStart[0]
        await request.delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await blogsInDB()
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
    })

    test('blog with none-existing id throws a 404 error', async () => {
        const id = await nonExistingId()
        await request.delete(`/api/blogs/${id}`)
            .expect(404)

        const blogsAtEnd = await blogsInDB()
        expect(blogsAtEnd).toHaveLength(initialBlogs.length)
    })

    test('blog with invalid id throws a 400 error', async () => {
        const invalidId = '555'
        await request.delete(`/api/blogs/${invalidId}`)
            .expect(400)

        const blogsAtEnd = await blogsInDB()
        expect(blogsAtEnd).toHaveLength(initialBlogs.length)
    })

})

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

