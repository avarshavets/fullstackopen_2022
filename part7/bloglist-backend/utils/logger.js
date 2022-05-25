// print normal log message
const info = (...params) => {
    // do not print the logs in test mode
    if (process.env.NODE_ENV !== 'test') {
        console.log(...params)
    }
}

// print error for all error messages
const error = (...params) => {
    if (process.env.NODE_ENV !== 'test') {
        console.log(...params)
    }
}

module.exports = {
    info, error
}
