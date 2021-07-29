import React from 'react'
import { logoutUser } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import { setErrorMessage } from '../reducers/notificationReducer'
import { Button } from 'react-bootstrap'

const Logout = () => {
  const dispatch = useDispatch()
  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(logoutUser())
    dispatch(setErrorMessage('Logged out'))
  }

  return (
    <Button onClick={handleLogout}>logout</Button>
  )
}

export default Logout