import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import AddBlogs from './components/AddBlogs'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import { setErrorMessage } from './reducers/notificationReducer' 
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef() 
  const dispatch = useDispatch()

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

  const addNewBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    try {
      const returnedBlogs = await blogService.create(newBlog)
      dispatch(setErrorMessage(`Added new blog: ${newBlog.title} by ${newBlog.author}`))
      returnedBlogs.user = user
      setBlogs(blogs.concat(returnedBlogs))
      setUser(user)
    } catch (exception) {
      dispatch(setErrorMessage('Error adding blogs'))
    }
  }

  const addLikes = async (newBlog) => {
    try {
      await blogService.update(newBlog)
      dispatch(setErrorMessage(`Liked blog: ${newBlog.title} by ${newBlog.author}`))
    } catch (exception) {
      dispatch(setErrorMessage('Error adding like'))
    }
  }

  const deleteBlogs = async (blog) => {
    try {
      const temp = blog
      await blogService.remove(blog)
      dispatch(setErrorMessage(`Deleted blog: ${temp.title} by ${temp.author}`))
      setBlogs(blogs.filter((blog) => blog !== temp ))
    } catch (exception) {
      dispatch(setErrorMessage('Error deleting blogs'))
    }
  }

  const blogForm = () => (
    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
      <AddBlogs addNewBlog = {addNewBlog} />
    </Togglable>
  )

  return (
    <div className = "main">
      <Notification message={useSelector(state => state.content)} className = "error"/>
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
          {blogs
            .sort((a, b) => (a.likes - b.likes))
            .map(blog =>
              <Blog key={blog.id} blog={blog} addLikes={addLikes} user={user} deleteBlogs={deleteBlogs}/>
            )}
        </>
      }
    </div>
  )
}

export default App