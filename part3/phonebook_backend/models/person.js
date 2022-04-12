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
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    num: {
        type: String,
        minLength: 8,
        validate: {
            validator: num => {
                return /^\d{2,3}-\d+$/.test(num)
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        required: true
    }
})

// modify toJSON method that will transform mongoose document before returning (replace or delete '_id' and '__v')
personSchema.set('toJSON',  {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)