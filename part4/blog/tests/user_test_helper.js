// Mongoose blog Schema
const User = require('../models/user')

//  Data set for testing
const initialUsers = [
    {
        username: "mchan",
        name: "Michael Chan",
        passwordHash: "myMCpsw",
    },
    {
        username: "msmith",
        name: "Michael Smith",
        passwordHash: "myMSmithPsw",
    },
    {
        username: "avvw",
        name: "Anna Wang",
        passwordHash: "myavvwpsw",
    }
]

const usersInDB = async () => {
    const users = await User.find({})
    // convert mongoDB document to json
    return users.map(user => user.toJSON())
}

// return id of mongoDB document that does not exist any more
const nonExistingId = async () => {
    const user = new user({
        "username": "testname",
        "name": "Test Name",
        "passwordHash": "testpassword",
    })
    await user.save()
    await user.remove()

    return user._id.toString()
}

module.exports = {
    initialUsers,
    usersInDB,
    nonExistingId
}