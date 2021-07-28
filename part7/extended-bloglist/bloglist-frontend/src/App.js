import React from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import BlogForm from './components/AddBlogs'
import Notification from './components/Notification'
import { useSelector } from 'react-redux'

const App = () => {

  const user = useSelector(state => state.user)

  return (
    <div className = "main">
      <Notification />
      <div className = 'headtitle'><h1>Blogslist App</h1></div>
      {user === null ?
        <>
          <h2>Log in to application</h2>
          <LoginForm />
        </>:
        <>
          <div className='userlogout'>
            {user.name} logged in&nbsp;
            <Logout />
          </div>
          <BlogForm />
          <Blogs />
        </>
      }
    </div>
  )
}

export default App