import React from 'react'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import BlogForm from './components/AddBlogs'
import UserView from './components/UserView'
import Notification from './components/Notification'
import User from './components/User'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

const padding = { padding: 5 }

const App = () => {
  const user = useSelector(state => state.user)

  return (
    <div className = "main">
      <Router>
    <div>
      <Notification />
      {user === null ?
        <>
          <h2>Log in to application</h2>
          <LoginForm />
        </>:
        <>
          <div>
            <Link style={padding} to = '/'>blogs</Link> 
            <Link style={padding} to = '/users'>users</Link> 
            {user.name} logged in&nbsp;
            <Logout />
          </div>
          <div className = 'headtitle'><h1>Blogslist App</h1></div>
          <Switch>
            <Route path='/blogs/:id'>
              <Blog />
            </Route>
            <Route path='/users/:id'>
              <User />
            </Route>
            <Route path='/users'>
              <UserView />
            </Route>
            <Route path='/'>
              <BlogForm />
              <Blogs />
            </Route>
          </Switch>
        </>
      }
    </div>
    </Router>
  </div>
  )
}

export default App