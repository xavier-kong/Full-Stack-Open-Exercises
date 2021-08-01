import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { ALL_BOOKS } from './Books'

const USER_INFO = gql`
query {
  me {
    favoriteGenre
  }
}
`

const Recommended = (props) => {

  const favGen = useQuery(USER_INFO)
  const result = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if (!favGen.data || !result.data) {
    return (
      <div>loading...</div>
    )
  }

  const books = result.data.allBooks.filter(book => book.genres.includes(favGen.data.me.favoriteGenre))

  return (
    <div>
      books in your favourite genre <b>{favGen.data.me.favoriteGenre}</b>
      <br />
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
          {books.map(a =>
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

export default Recommended
