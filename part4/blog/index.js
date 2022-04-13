const app = require('./app') // the actual Express application
const http = require('http') // Node.js module for http requests (axios is an alternative)
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

server.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})

