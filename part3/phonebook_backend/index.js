// use the variables in the .env file with dotenv module in express
require('dotenv').config()
const express = require('express')
const morgan = require('morgan') // logging middleware
const {token} = require("morgan");
const cors = require('cors') // cors middleware allows requests from all origins
// Note: backend and frontend run in different localhost ports --> servers do not have the save origins

const app = express()
// enables express to use json-parser as a middleware
app.use(express.json())

// enable express to use morgan logging with a custom token
morgan.token('post-obj', (req,res) => {
    return req.method === 'POST'? JSON.stringify(req.body) : ' '
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-obj'))

app.use(cors())
app.use(express.static('build'))

// add connection to MongoDB
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
console.log('connecting to', url)

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })


const personSchema = new mongoose.Schema({
    name: String,
    num: Number,
})

// modify toJSON method that will transform mongoose document before returning (replace or delete '_id' and '__v')
personSchema.set('toJSON',  {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Person = mongoose.model('Person', personSchema)


// let persons = [
//     {
//         "id": 1,
//         "name": "Arto Hellas",
//         "num": "040-123456"
//     },
//     {
//         "id": 2,
//         "name": "Ada Lovelace",
//         "num": "39-44-5323523"
//     },
//     {
//         "id": 3,
//         "name": "Dan Abramov",
//         "num": "12-43-234345"
//     },
//     {
//         "id": 4,
//         "name": "Mary Poppendieck",
//         "num": "39-23-6423122"
//     }
// ]


// get request to the /api/persons path of the application
app.get('/api/persons', (request, response) => {
    Person.find().then(person => {
        response.json(person)
    })
})

app.get('/info', (request, response) => {
    const datestamp = new Date
    const res =
        `<p>Phonebook has info for ${persons.length} people</p>
         <p>${datestamp}</p>`
    response.send(res)
})

// get request to the /api/persons/:id path of the application,
// where :id is a route parameter defined by using the colon syntax
app.get('/api/persons/:id', (req, res) => {
    // id variable of request contains a string '1' --> remember to convert to numbers
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    person ? res.json(person) : res.status(404).end()
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    // respond with a status code 204 no content and return no data with the response
    res.status(204).end()
})


// adding entries to the web server
// Remember: json-parser is needed to handle json obj --> app.use(express.json())
app.post('/api/persons',(req, res) => {
    // create a new id for a new entry
    const generated_id = Math.random()*100000

    const body = req.body
    if (!body.name || ! body.num) {
        return res.status(400).json({error: 'name or number is missing'})
    }

    const personFound = persons.find(person => person.name === body.name)
    if (personFound) {
        return res.status(400).json({error: 'name must be unique'})
    }

    const person = {
        id: generated_id,
        name: body.name,
        num: body.num
    }

    persons = persons.concat(person)
    res.json(person)
})

const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
