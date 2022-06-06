import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    id
    name
    born
    bookCount
  }
}
`
export const ALL_GENRES = gql`
query {
  allGenres 
}
`

const BOOK_DETAILS = gql`
fragment BookDetails on Book {
  id
  title
  author {
    name
  }
  published
  genres
}
`

export const ALL_BOOKS = gql`
query allBooks($author: String, $genre: String) {
  allBooks(author: $author, genre: $genre) {
     ...BookDetails
  }
}
${BOOK_DETAILS}
`

export const ADD_BOOK = gql`
mutation addBook($title: String!, $published: Int!, $author: String!, $genres: [String]!){
  addBook(
    title: $title, 
    published: $published, 
    author: $author, 
    genres: $genres) {
     ...BookDetails
  }
}
${BOOK_DETAILS}
`

export const EDIT_AUTHOR = gql`
mutation updateAuthor($name: String!, $setBornTo: Int!){
  editAuthor(
    name: $name, 
    setBornTo: $setBornTo) {
      name
      born
      bookCount
  }
}  
`

export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password){
    value
  }
}
`

export const ME = gql`
query { 
  me {
    favouriteGenre
  }
}
`

export const BOOK_ADDED = gql`
subscription {
  bookAdded {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`