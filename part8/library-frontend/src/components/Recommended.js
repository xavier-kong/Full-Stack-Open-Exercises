import React, { useState, useEffect} from 'react'
import { gql, useLazyQuery, useQuery } from '@apollo/client'
import { ALL_BOOKS } from './Books'

const USER_INFO = gql`
query {
  me {
    favoriteGenre
  }
}
`

const Recommended = (props) => {
  const userInfo = useQuery(USER_INFO)
  const [ getBooks, result ] = useLazyQuery(ALL_BOOKS)
  const [ books, setBooks] = useState([])

  useEffect(() => {
    if (userInfo.data) {
      getBooks({ variables: { genre: userInfo.data.me.favoriteGenre } })
    }
  }, [userInfo, getBooks])

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result])

  if (!props.show) {
    return null
  }  

  if (!userInfo.data) {
    return (
      <div>loading...</div>
    )
  }

  return (
    <div>
      books in your favourite genre <b>{userInfo.data.me.favoriteGenre}</b>
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
