const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
    const { username, password } = request.body

    const currentUser = await User.findOne({ username })
    const passwordCorrect = currentUser === null
        ? false
        // if user is found --> check if password is correct
        // (compare given psw and a hash stored in DB)
        : await bcrypt.compare(password, currentUser.passwordHash)

    if (!(currentUser && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userForToken = {
        username: currentUser.username,
        id: currentUser._id,
    }

    // token contains the username and the user id in a digitally signed form
    const token = jwt.sign(userForToken, process.env.SECRET)

    response
        .status(200)
        .send({
            token,
            id: currentUser._id,
            username: currentUser.username,
            name: currentUser.name
        })
})

module.exports = loginRouter