const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const {requestLogger} = require("../utils/middleware");

blogRouter.get('/', (request, response) => {
    Blog.find({}).then(blogs => {
        response.json(blogs)
    })
})


blogRouter.post('/', async (request, response, next) => {
    const blog = new Blog(request.body)

    blog.save()
        .then(savedBlog => {
            response.status(201).json(savedBlog)
        })
        .catch(error => next(error))
})


blogRouter.get('/:id', (request, response, next) => {
     Blog.findById(request.params.id)
        .then(blog => {
            blog ? response.json(blog) : response.status(404).end()
        })
        .catch(error => next(error))
})


blogRouter.delete('/:id', (request, response, next) => {
    Blog.findByIdAndRemove(request.params.id)
        .then((result) => {
            console.log(result)
            result === null ? response.status(400).end() : response.status(204)
        })
        .catch(error => next(error))
})


// blogRouter.put('/:id', (req, res, next) => {
//     const body = req.body
//     const blog = new Blog({
//         _id: req.params.id,
//         title: body.title,
//         author: body.author,
//         url: body.url,
//         likes: body.likes
//     })
//
//     Blog.findByIdAndUpdate(req.params.id, blog, { returnDocument: 'after', runValidators: true })
//         .then(updatedBlog => {
//             res.json(updatedBlog)
//         })
//         .catch(error => next(error))
// })

module.exports = blogRouter