require('dotenv').config()  // use the variables in the .env file with dotenv module in express
const express = require('express')
const morgan = require('morgan')    // logging middleware
morgan.token('post-obj', (req) => {
    return req.method === 'POST' ? JSON.stringify(req.body) : ' '
}); // define custom token for morgan log
const cors = require('cors')    // cors middleware allows requests from all origins

const app = express()

app.use(express.static('build'))
app.use(express.json()) // enables express to use json-parser as a middleware
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-obj'))
app.use(cors())

// ----------------------------------
// import mongoose module
const Person = require('./models/person')


app.get('/api/persons', (request, response) => {
    Person.find().then(person => {
        response.json(person)
    })
})


app.get('/info', async (request, response) => {
    const datestamp = new Date
    const count = await Person.countDocuments({})
    const res =
        `<p>Phonebook has info for ${count} people</p>
         <p>${datestamp}</p>`
    response.send(res)
})


app.post('/api/persons', async (request, response, next) => {
    const body = request.body

    const person = new Person({
        name: body.name,
        num: body.num,
    })

    if (await Person.findOne({ name: new RegExp('^' + body.name + '$', 'i') })) {
        return response.status(400).json({ error: `${body.name} already in the phonebook` })
    }

    person.save()
        .then(savedPerson => {
            response.json(savedPerson)
        })
        .catch(error => next(error))
})


app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
            person ? res.json(person) : res.status(404).end()
        })
        .catch(error => next(error))
})


app.delete('/api/persons/:id', (req, res) => {
    Person.deleteOne({ _id: req.params.id }).then(resDb => {
        // respond with a status code 204 no content and return no data with the response

        if (resDb.deletedCount === 0) {
            return res.status(400).end()
        }
        res.status(204).end()
    })
})


app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body
    const person = new Person({
        _id: req.params.id,
        name: body.name,
        num: body.num,
    })

    Person.findByIdAndUpdate(req.params.id, person, { returnDocument: 'after', runValidators: true })
        .then(updatedPerson => {
            res.json(updatedPerson)
        })
        .catch(error => next(error))
})


const errorHandler = (error, request, response, next) => {
    console.error(error.message, error)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'id format is incorrect' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}
app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
