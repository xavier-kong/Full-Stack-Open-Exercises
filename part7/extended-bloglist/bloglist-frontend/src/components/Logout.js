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
    <form onSubmit={handleLogout}>
      <button type="submit">logout</button>
    </form>
  )
}

export default Logout