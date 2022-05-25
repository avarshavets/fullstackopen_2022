const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')


userRouter.get('/', async (request, response) => {
    // populate (join function in Mongoose) allows to add blogs instead of blog ids
    const users = await User
        .find({})
    response.json(users)

})


userRouter.post('/', async (request, response, next) => {
    try {
        const { username, name, password } = request.body

        // password must be at least 3 chars
        if (! password | (password && password.length < 3) ) {
            return response.status(400).json({ 'error': 'password is required and must be at least 3 chars long' })
        }

        // username must be unique
        const usernameFound = await User.findOne({ username })
        if (usernameFound) {
            return response.status(400).json({ 'error': 'username must be unique' })
        }

        // encrypting the password
        const saltRound = 10
        const passwordHash = await bcrypt.hash(password, saltRound)

        const user = new User({
                username,
                name,
                passwordHash
            }
        )

        const savedUser = await user.save()
        response.status(201).json(savedUser)
    } catch(error) {
        next(error)
    }
})


userRouter.get('/:id', async (request, response, next) => {
    try {
        const returnedUser = await User.findById(request.params.id)
        returnedUser ? response.json(returnedUser) : response.status(404).end()
    } catch (error) {
        next(error)
    }
})


userRouter.delete('/:id', async (request, response, next) => {
    try {
        const returnedOjb = await User.findByIdAndRemove(request.params.id)
        returnedOjb === null ? response.status(404).end() : response.status(204).end()
    } catch (error) {
        next(error)
    }

})


userRouter.put('/:id', async (request, response, next) => {
    try {
        const returnedUser = await User.findByIdAndUpdate(request.params.id,
            { $set: { passwordHash: request.body.passwordHash } },
            { returnDocument: 'after', runValidators: true })
        await response.json(returnedUser)
    } catch (error) {
        next(error)
    }
})

module.exports = userRouter