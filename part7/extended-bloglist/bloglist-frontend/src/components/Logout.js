import React from 'react'
import { logoutUser } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import { setErrorMessage } from '../reducers/notificationReducer'

const Logout = () => {
  const dispatch = useDispatch()
  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(logoutUser())
    dispatch(setErrorMessage('Logged out'))
  }

  return (
    <button onClick={handleLogout}>logout</button>
  )
}

export default Logout