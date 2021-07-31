import React from 'react'
import { gql, useQuery } from '@apollo/client'

export const ALL_BOOKS = gql`
query allBooks($genre: String, $author: String) {
  allBooks(genre: $genre, author: $author) {
    title
    published
    author {
      name
    }
  }
}
`

const Books = (props) => {

  const books = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if ( !books.data ) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.data.allBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{(a.author) ? a.author.name : null}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books