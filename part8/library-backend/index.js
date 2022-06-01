require('dotenv').config()

const { ApolloServer, UserInputError, gql, AuthenticationError} = require('apollo-server')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const MONGODB_URI = process.env.MONGODB_URI
console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: ID!
    id: ID!
    genres: [String]
  }
  
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }
  
  type User {
    username: String!
    passwordHash: String!
    favouriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }
  
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]!
    allAuthors: [Author]!
    me: User
  }
  
  type Mutation {
    addBook (
      title: String!
      published: Int!
      author: String!
      genres: [String]!
    ): Book
    
    editAuthor (
      name: String!
      setBornTo: Int!
    ): Author
    
    createUser (
      username: String!
      password: String!
      favouriteGenre: String!
    ): User
    
    login (
      username: String!
      password: String!
    ) : Token
  }
`

const resolvers = {
    Query: {
        bookCount: async () => Book.collection.countDocuments(),

        authorCount: async () => Author.collection.countDocuments(),

        allBooks: async (root, args) => {
            if (args.author && args.genre) {
                const author = await Author.findOne({ name: args.author})
                return author ? Book.find({ author: author._id, genres: { $in: [args.genre] } }) : []
            }
            if (args.author) {
                const author = await Author.findOne({ name: args.author})
                return author ? Book.find({ author: author._id }) : []
            }
            if (args.genre) {
                return Book.find({ genres: { $in: [args.genre] }})
            }
            return Book.find({})
        },

        allAuthors: async () => Author.find({}),

        me: (root, args, context) => {
            return context.currentUser
        }
    },

    Mutation: {
        addBook: async (root, args, context) => {
            const currentUser = context.currentUser
            if (!currentUser) {
                throw new AuthenticationError('not authenticated')
            }

            if ( !args.title || args.title.length < 2) {
                throw new UserInputError('Title must be as least 2 characters!')
            }

            if (!args.author || args.author.length < 4) {
                throw new UserInputError('Author name must be as least 4 characters!')
            }

            try {
                // find author by name: if author doesn't exist - and add new author,
                // if author already exists - update author with new book count.
                let author = await Author.findOne({ name: args.author })
                if (!author) {
                    author = new Author({ name: args.author, bookCount: 1 })
                } else {
                    author.bookCount = author.bookCount + 1
                }

                const book = new Book({...args, author: author._id})

                await book.save()
                await author.save()
                return book
            }
            catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }
        },

        editAuthor: async (root, args, { currentUser }) => {
            // currentUser from the context is extracted through destructuring
            if (!currentUser) {
                throw new AuthenticationError('not authenticated')
            }

            const author = await Author.findOne({ name: args.name })
            if (!author) {
                throw new UserInputError('Author not found!')
            }

            author.born = args.setBornTo
            try {
                return await author.save()
            }
            catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }
        },

        createUser: async (root, args) => {
            // password must be at least 3 chars
            if (!args.password || args.password.length < 3) {
                throw new UserInputError('password is required and must be at least 3 chars long')
            }

            // username must be unique
            const usernameFound = await User.findOne({ username: args.username })
            if (usernameFound) {
                throw new UserInputError('username must be unique')
            }

            // encrypting the password
            const saltRound = 10
            const passwordHash = await bcrypt.hash(args.password, saltRound)

            const user = new User({
                username: args.username,
                passwordHash,
                favouriteGenre: args.favouriteGenre
            })

            return user.save().catch(error => {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            })
        },

        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            // if user is found --> check if password is correct (compare psw with psw hash from db)
            const pswCorrect = !user ? false : await bcrypt.compare(args.password, user.passwordHash)

            if (!(user && pswCorrect)) {
                throw new UserInputError('wrong credentials')
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            }

            // token contains the username and the user id in a digitally signed form
            const token = jwt.sign(userForToken, process.env.SECRET)

            // return object of type Token
            return { value: token }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    // the object returned by context is given to all resolvers as their third parameter
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const decodedToken = jwt.verify(auth.substring(7), process.env.SECRET)
            const currentUser = await User.findById(decodedToken.id)
            return { currentUser }
        }
    }
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})