import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import BlogForm from './components/AddBlogs'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import { setErrorMessage } from './reducers/notificationReducer' 
import { useDispatch } from 'react-redux'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

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
      setUser(user)
      setUsername('')
      setPassword('')
      dispatch(setErrorMessage(`Welcome ${user.name}`))
    } catch (exception) {
      dispatch(setErrorMessage('Wrong credentials'))
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    dispatch(setErrorMessage('Logged out'))
  }

  return (
    <div className = "main">
      <Notification />
      <div className = 'headtitle'><h1>Blogslist App</h1></div>
      {user === null ?
        <>
          <h2>Log in to application</h2>
          <LoginForm handleLogin = {handleLogin} username = {username} setUsername = {setUsername} password = {password} setPassword = {setPassword}/>
        </>:
        <>
          <div className='userlogout'>
            {user.name} logged in&nbsp;
            <Logout handleLogout = {handleLogout}/>
          </div>
          <BlogForm />
          <Blogs user={user}/>
        </>
      }
    </div>
  )
}

export default App