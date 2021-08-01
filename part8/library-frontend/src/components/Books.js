
import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client'

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

const returnGenres = (books) => {
  let genreList = []
  books.forEach(book => book.genres.forEach(genre => !genreList.includes(genre) ? genreList.push(genre) : null))
  return genreList
}

const Books = (props) => {
  const [ genrefilter, setGenrefilter ] = useState('')

  const handleChange = (event) => {
    event.preventDefault()
    setGenrefilter(event.target.value)
  }
  const result = useQuery(ALL_BOOKS)
  
  if (!props.show) {
    return null
  }

  if ( !result.data ) {
    return <div>loading...</div>
  }

  const books = (genrefilter ==='' ? result.data.allBooks : result.data.allBooks.filter(book => book.genres.includes(genrefilter)))

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
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{(a.author) ? a.author.name : null}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      
      <select value={genrefilter} onChange={handleChange}>
        <option value={''}>Select genre</option>
        {returnGenres(result.data.allBooks).map(a => 
        <option value={a} key={a}>{a}</option>
        )}
      </select>
      
    </div>
  )
}

export default Books