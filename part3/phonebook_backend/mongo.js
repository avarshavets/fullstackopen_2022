const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://annke:${password}@cluster0.acxzu.mongodb.net/Persons?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    id: Number,
    name: String,
    num: Number,
})

const Person = mongoose.model('Person', personSchema)

const personName = process.argv[3]
const personNum = process.argv[4]

const person = new Person({
    name: personName,
    num: personNum
})

if (personName && personNum) {
    person.save().then(result => {
        console.log(`added ${person.name} ${person.num} to phonebook`)
        mongoose.connection.close()
    })
} else {
    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(person => {console.log(person.name, person.num)})
        mongoose.connection.close()
    })
}


