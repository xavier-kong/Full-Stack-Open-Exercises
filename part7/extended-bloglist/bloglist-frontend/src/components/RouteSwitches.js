import React from 'react'
import Blogs from './Blogs'
import Blog from './Blog'
import { BrowserRouter as Switch, Route } from 'react-router-dom'
import BlogForm from './AddBlogs'
import UserView from './UserView'
import User from './User'

const RouteSwitches = () => {
  return (
    <div>
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
          <BlogForm /><br />
          <Blogs />
        </Route>
      </Switch>
    </div>
  )
}

export default RouteSwitches
