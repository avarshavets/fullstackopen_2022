const commentRouter = require('express').Router()
const Comment = require('../models/comment')


commentRouter.get('/', async(request, response) => {
    const comments = await Comment.find({})
    response.json(comments)

})

module.exports = commentRouter