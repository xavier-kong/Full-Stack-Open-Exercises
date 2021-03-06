import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../graphql/mutations'

const Login = ({ show, setToken }) => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      window.alert(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token' ,token)
    }
  }, [result.data]) // eslint-disable-line

  if (!show) {
    return null
  }

  const loginHandler = (event) => {
    event.preventDefault()

    login({ variables: {username, password} })

    setUsername('')
    setPassword('')

  }

  return (
    <div>
      <form onSubmit = {loginHandler}>
          <div>
            username
            <input
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">
            login
          </button>
      </form>
    </div>
  )
}

export default Login