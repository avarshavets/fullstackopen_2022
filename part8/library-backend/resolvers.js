const Book = require("./models/book");
const Author = require("./models/author");
const {AuthenticationError, UserInputError} = require("apollo-server");
const User = require("./models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
    Query: {
        bookCount: async () => Book.collection.countDocuments(),

        authorCount: async () => Author.collection.countDocuments(),

        allGenres: async () => {
            const books = await Book.find({})
            const allGenres = new Set()
            books.forEach(book => {
                book.genres.forEach(genre => allGenres.add(genre))
            })
            return allGenres
        },

        allBooks: async (root, args) => {
            if (args.author && args.genre) {
                const authorObj = await Author.findOne({ name: args.author})
                return authorObj ? Book
                    .find({ author: authorObj._id, genres: { $in: [args.genre]} })
                    .populate('author', { name: 1 }) : []
            }
            if (args.author) {
                const authorObj = await Author.findOne({ name: args.author})
                return authorObj ? Book
                    .find({ author: authorObj._id })
                    .populate('author', { name: 1 }) : []
            }
            if (args.genre) {
                return Book
                    .find({ genres: { $in: [args.genre] }})
                    .populate('author', { name: 1 })
            }
            return  Book.find({}).populate('author', { name: 1 })
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
                let authorObj = await Author.findOne({ name: args.author })
                if (!authorObj) {
                    authorObj = new Author({ name: args.author, bookCount: 1 })
                } else {
                    authorObj.bookCount = authorObj.bookCount + 1
                }

                const book = new Book({ ...args, author: authorObj._id })

                await book.save()
                await authorObj.save()
                const populatedBook = book.populate('author', { name: 1 })
                pubsub.publish('BOOK_ADDED', { bookAdded: populatedBook })

                return populatedBook
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
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
        }
    }
}

module.exports = resolvers