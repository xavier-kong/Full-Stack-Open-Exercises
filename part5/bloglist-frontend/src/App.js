import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import AddBlogs from './components/AddBlogs'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null) 
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

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
      setErrorMessage(`Welcome ${user.name}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setErrorMessage('Logged out')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
  }

  const addNewBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    try {
      const returnedBlogs = await blogService.create(newBlog)
      setErrorMessage(`Added new blog: ${newBlog.title} by ${newBlog.author}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setBlogs(blogs.concat(returnedBlogs))
    } catch (exception) {
      setErrorMessage('Error adding blogs')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addLikes = async (newBlog) => {
    try {
      await blogService.update(newBlog)
      setErrorMessage(`Liked blog: ${newBlog.title} by ${newBlog.author}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Error adding like')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const blogForm = () => (
    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
      <AddBlogs addNewBlog = {addNewBlog} />
    </Togglable>
  )

  return (
    <div className = "main">
        <Notification message={errorMessage} className = "error"/>
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
          {blogForm()}
          <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} addLikes={addLikes}/>
          )}
        </>
        }
    </div>
  )
}

export default App