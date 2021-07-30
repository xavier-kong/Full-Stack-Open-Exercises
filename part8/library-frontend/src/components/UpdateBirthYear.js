import React, { useState } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS } from './Authors'

const UPDATE_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`
const UpdateBirthYear = () => {
  const [ name, setName ] = useState('')
  const [ born, setBorn ] = useState('')

  const [ updateBirthYear ] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  const submit = (event) => {
    event.preventDefault()
    
    const year = Number(born)
    updateBirthYear({ variables: { name: name, setBornTo: year } })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default UpdateBirthYear
