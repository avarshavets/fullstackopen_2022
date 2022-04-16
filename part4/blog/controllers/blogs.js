const blogRouter = require('express').Router()
const Blog = require('../models/blog')


blogRouter.get('/', async(request, response) => {

    // Blog.find({}).then(blogs => {
    //     response.json(blogs)
    // })

    const blogs = await Blog.find({})
    response.json(blogs)

})


blogRouter.post('/',async (request, response, next) => {
    if (!request.body.title | !request.body.url) {
        return response.status(400).end()
    }

    const blog = new Blog(request.body)

    if (!request.body.likes) {
        blog.likes = 0
    }

    // blog.save()
    //     .then(savedBlog => {
    //         response.status(201).json(savedBlog)
    //     })
    //     .catch(error => next(error))

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
})


blogRouter.get('/:id', async (request, response, next) => {

     // Blog.findById(request.params.id)
     //    .then(blog => {
     //        blog ? response.json(blog) : response.status(404).end()
     //    })
     //    .catch(error => next(error))

    try {
        const returnedBlog = Blog.findById(request.params.id)
        returnedBlog ? response.json(blog) : response.status(404).end()
    } catch (error) {
        next(error)
    }
})


blogRouter.delete('/:id', async (request, response, next) => {

    // Blog.findByIdAndRemove(request.params.id)
    //     .then((result) => {
    //         result === null ? response.status(404).end() : response.status(204).end()
    //     })
    //     .catch(error => next(error))

    try {
        const returnedOjb = await Blog.findByIdAndRemove(request.params.id)
        returnedOjb === null ? response.status(404).end() : response.status(204).end()
    } catch (error) {
        next(error)
    }

})


blogRouter.put('/:id', async(request, response, next) => {
    // update only likes

    // Blog.findByIdAndUpdate(request.params.id, { $set: { likes: request.body.likes }}, { returnDocument: 'after', runValidators: true })
    //     .then(updatedBlog => {
    //         response.json(updatedBlog)
    //     })
    //     .catch(error => next(error))

    try {
        const returnedBlog = await Blog.findByIdAndUpdate(request.params.id,
            { $set: { likes: request.body.likes }},
            { returnDocument: 'after', runValidators: true })
        await response.json(returnedBlog)
    } catch (error) {
        next(error)
    }
})

module.exports = blogRouter