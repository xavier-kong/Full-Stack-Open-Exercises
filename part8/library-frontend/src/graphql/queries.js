import { gql } from '@apollo/client'

export const ALL_BOOKS = gql`
query allBooks($genre: String, $author: String) {
  allBooks(genre: $genre, author: $author) {
    title
    published
    author {
      name
    }
    genres
  }
}
`

export const USER_INFO = gql`
query {
  me {
    favoriteGenre
  }
}
`

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
  }
}
`