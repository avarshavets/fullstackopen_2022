// const express = require('express') -->
// --> when using 'require' compiler will interpret everything express-related to be of type 'any'
//     whereas when we use 'import', the editor knows the actual types of express-related parameters
// Thus, we will use import statement to import express module
// If it does not work, a combined method can be used --> import ... = require('...')
import express from 'express'
const app = express()

// unused local variables are not allowed in TypeScrips --> underscore prefix can fix this issue for 'req' parameter
app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!')
})


const PORT = 3003

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})