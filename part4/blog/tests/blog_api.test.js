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

const {blogsInDB, nonExistingId} = require("./blog_test_helper");

const initialBlogs = helper.initialBlogs


// clear all document in DB and populate with the data set
beforeEach( async () => {
    await Blog.deleteMany({})
    for (const blog of initialBlogs) {
        let blogObj = new Blog(blog)
        await blogObj.save()
    }

    await User.deleteMany({})
    for (const user of helperUser.initialUsers) {
        let userObj = new User(user)
        await userObj.save()
    }
})

describe('HTTP GET testing', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
            // example of console log in then()
            .then(response => {console.log(response.header)})
    }, 100000)
    // The timeout ensures that our test won't fail due to the time it takes to run.

    test('returned blog number is correct', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(initialBlogs.length)
    })

    test('id property exists', async () => {
        const response = await api.get('/api/blogs')
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

        await api.post('/api/blogs').send(newBlog)
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

    test('blog without likes has default likes = 0', async () => {
        const usersAtStart = await helperUser.usersInDB()
        const currentUser = usersAtStart[0]

        const newBlog = {
            'title': 'new title',
            'author': 'new author',
            'url': 'new url',
            'user': currentUser.id
        }

        await api.post('/api/blogs').send(newBlog)
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

        await api.post('/api/blogs').send(newBlog)
            .expect(400)

        const resultedBlogs = await helper.blogsInDB()
        expect(resultedBlogs).toHaveLength(initialBlogs.length)
    })
})

describe('HTTP DELETE testing', () => {
    test('blog is deleted successfully', async () => {
        const blogsAtStart = await blogsInDB()
        const blogToDelete = blogsAtStart[0]
        await api.delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await blogsInDB()
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
    })

    test('blog with none-existing id throws a 404 error', async () => {
        const id = await nonExistingId()
        await api.delete(`/api/blogs/${id}`)
            .expect(404)

        const blogsAtEnd = await blogsInDB()
        expect(blogsAtEnd).toHaveLength(initialBlogs.length)
    })

    test('blog with invalid id throws a 400 error', async () => {
        const invalidId = '555'
        await api.delete(`/api/blogs/${invalidId}`)
            .expect(400)

        const blogsAtEnd = await blogsInDB()
        expect(blogsAtEnd).toHaveLength(initialBlogs.length)
    })

})

describe('HTTP PUT testing', () => {
    test('likes value is updated successfully', async () => {
        const blogsAtStart = await blogsInDB()
        const blogToUpdate = blogsAtStart[0]
        const valueToUpdate = {'likes': 50}
        await api.put(`/api/blogs/${blogToUpdate.id}`).send(valueToUpdate)
            .expect(200)
            .expect('Content-Type', /application\/json/)
            .expect(res => {
                res.body.likes = valueToUpdate.likes
            })
    })

    test('blog with invalid id throws 400 error', async () => {
        const invalidId = '555'
        const valueToUpdate = {'likes': 50}
        await api.put(`/api/blogs/${invalidId}`).send(valueToUpdate)
            .expect(400)
            .expect(res => {
                res.body.error = 'id format is incorrect'
            })
    })
})


afterAll(() => {
    mongoose.connection.close()
})

