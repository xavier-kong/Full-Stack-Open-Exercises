import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import AddBlogs from './components/AddBlogs'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null) 
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: title, 
      author: author, 
      url: url
    }
    try {
      const returnedBlogs = await blogService.create(newBlog)
      setBlogs(blogs.concat(returnedBlogs))
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      setErrorMessage('Error adding blogs')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    
  }

  return (
    <div>
        <Notification message={errorMessage} />
        <h1>Blogs</h1>
        
        {user === null ?
        <>
          <h2>Log in to application</h2>
          <LoginForm handleLogin = {handleLogin} username = {username} setUsername = {setUsername} password = {password} setPassword = {setPassword}/> 
        </>:
        <div>
          <p>{user.name} logged-in</p>
          <Logout handleLogout = {handleLogout}/>
          <AddBlogs title = {title} setTitle = {setTitle} author = {author} setAuthor = {setAuthor} url = {url} setUrl = {setUrl} addBlog = {addBlog}/>
          <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
        }
    </div>
  )
}

export default App