const {gql} = require("apollo-server");

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String]!
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
    allGenres: [String]!
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

type Subscription {
  bookAdded: Book!
}

`
module.exports = typeDefs