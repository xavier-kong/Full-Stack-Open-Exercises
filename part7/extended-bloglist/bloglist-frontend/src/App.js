import React from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import BlogForm from './components/AddBlogs'
import UserView from './components/UserView'
import Notification from './components/Notification'
import User from './components/User'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const App = () => {
  const user = useSelector(state => state.user)

  return (
    <>
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
        </>
      }
    </div>

    <Router>
      <Switch>
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
    </Router>
  </>
  )
}

export default App