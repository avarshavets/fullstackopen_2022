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

export const ALL_BOOKS = gql`
query {
   allBooks {
     id
     title
     author
     published
     }
   }
`

export const ADD_BOOK = gql`
mutation addBook($title: String!, $published: Int!, $author: String!, $genres: [String]!){
  addBook(
    title: $title, 
    published: $published, 
    author: $author, 
    genres: $genres) {
      id
      title
      author
      published
      genres
  }
}
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