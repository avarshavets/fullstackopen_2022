const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')


blogRouter.get('/', async(request, response) => {
    // populate (join function in Mongoose) allows to add user obj
    // (or specified fields in user obj) instead of user ids
    const blogs = await Blog.find({})
    response.json(blogs)

})


blogRouter.post('/',async (request, response, next) => {
    try {
        // user authorized to post is extracted by userExtraction middleware, and saved in request.user
        const currentUser = request.user

        const body = request.body

        if (!body.title | !body.url | !body.author) {
            return response.status(400).json({'error': "title, author, or url are missing"})
        }

        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes,
            user: currentUser._id
        })

        // default likes 0 if no likes given
        if (!request.body.likes) {
            blog.likes = 0
        }

        const savedBlog = await blog.save()
        // add blog to the current user and save!! changes in the user
        currentUser.blogs = currentUser.blogs.concat(savedBlog._id)
        await currentUser.save()

        response.status(201).json(savedBlog)
    }
    catch(error) {
        next(error)
    }
})


blogRouter.get('/:id', async (request, response, next) => {
    try {
        const returnedBlog = await Blog.findById(request.params.id)
        returnedBlog ? response.json(returnedBlog) : response.status(404).end()
    }
    catch (error) {
        next(error)
    }
})


blogRouter.delete('/:id', async (request, response, next) => {
    const currentUser = request.user
    try {
        const returnedObj = await Blog.findByIdAndRemove(request.params.id)
        returnedObj === null ? response.status(404).end() : response.status(204).end()
        // blogs id is an Mongoose Object NOT a String --> convert toString()
        currentUser.blogs = currentUser.blogs.filter(blog => blog.toString() !== returnedObj._id.toString())
        await currentUser.save()
    }
    catch (error) {
        next(error)
    }

})


blogRouter.put('/:id', async(request, response, next) => {
    try {
        const returnedBlog = await Blog.findByIdAndUpdate(request.params.id,
            { $set: { likes: request.body.likes } },
            { returnDocument: 'after', runValidators: true })
        await response.json(returnedBlog)
    }
    catch (error) {
        next(error)
    }
})

blogRouter.get('/:id/comments', async(request, response, next) => {
    try {
        const blog = await Blog.findById(request.params.id).populate('comments', {content: 1})
        blog ? response.json(blog.comments) :
        response.status(400).json({'error': "blog has been removed"})
    }
    catch (error) {
        next(error)
    }
})

blogRouter.post('/:id/comments',async (request, response, next) => {
    try {
        const commentContent = request.body.content

        if (!commentContent) {
            return response.status(400).json({'error': "comment is missing"})
        }

        const blog = await Blog.findById(request.params.id)

        if (!blog) {
            return response.status(400).json({'error': "blog has been removed"})
        }
        const comment = new Comment ({
            content: commentContent,
            blog: blog._id
        })

        const savedComment = await comment.save()
        blog.comments = blog.comments.concat(savedComment._id)
        blog.save()

        // const populatedBlog = await savedBlog.populate('comments', { content: 1 })
        // can return list of comment object or entire updated blog object
        response.status(201).json(savedComment)
    }
    catch(error) {
        next(error)
    }
})

module.exports = blogRouter