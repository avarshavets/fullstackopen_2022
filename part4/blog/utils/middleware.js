const logger = require('./logger')
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// extract the token from the authorization header (will be stored in request.token)
const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7)
    }

    next()
}

// find user associated with the token (will be stored in request.user)
const userExtractor = async (request, response, next) => {
    try {
        const token = request.token
        // if token is invalid or missing, error will be caught and handled by errorHandler middleware
        const decodedToken = jwt.verify(token, process.env.SECRET)

        const user = await User.findById(decodedToken.id)

        if (!user) {
            return response.status(400).json({ error: "user with the given id cannot be found" })
        }
        request.user = user
    }
    catch(error) {
        next(error)
    }

    next()
}

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'id format is incorrect' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: 'missing or invalid token' })
    }

    next(error)
}

module.exports = {
    tokenExtractor,
    userExtractor,
    requestLogger,
    unknownEndpoint,
    errorHandler
}