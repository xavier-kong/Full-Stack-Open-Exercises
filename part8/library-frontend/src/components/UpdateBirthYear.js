import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS } from '../graphql/queries'
import { UPDATE_AUTHOR } from '../graphql/mutations'

const UpdateBirthYear = ({ authors }) => {
  const [ name, setName ] = useState('')
  const [ born, setBorn ] = useState('')

  const [ updateBirthYear ] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  const handleChange = (event) => {
    event.preventDefault()
    setName(event.target.value);
  }

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
          <select value={name} onChange={handleChange}>
            <option value='none'>Please select name</option>
            {authors.data.allAuthors.map(a => 
            <option value={a.name} key={a.name}>{a.name}</option>
            )}
          </select>
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
