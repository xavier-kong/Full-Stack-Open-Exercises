import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { setUser } from '../reducers/userReducer'
import { setErrorMessage } from '../reducers/notificationReducer' 
import { Button, Form } from 'react-bootstrap'

export const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch(setUser(user))
      dispatch(setErrorMessage(`Welcome ${user.name}`))
    } catch (exception) {
      dispatch(setErrorMessage('Wrong credentials'))
    }
  }
  
  return (
    <>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username&nbsp;</Form.Label>
          <Form.Control
            id='usernamefield'
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        <Form.Label>password&nbsp;</Form.Label>
          <Form.Control
            id='passwordfield'
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          /><br />
        <Button type="submit" id='loginsubmit'>login</Button>
        </Form.Group>
      </Form>
    </>
  )
}

export default LoginForm