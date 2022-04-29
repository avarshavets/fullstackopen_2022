// create a new router for tests
const testingRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

// create an API endpoint 'http/../reset' with a business logic that enables to empty the database
testingRouter.post('/reset', async (request, response) => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    response.status(204).end()
})

module.exports = testingRouter