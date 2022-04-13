// print normal log message
const info = (...params) => {
    console.log(...params)
}

// print error for all error messages
const error = (...params) => {
    console.error(...params)
}

module.exports = {
    info, error
}
