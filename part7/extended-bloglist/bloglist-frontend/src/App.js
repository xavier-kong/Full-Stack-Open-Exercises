import React from 'react'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import NavBar from './components/NavBar'
import RouteSwitches from './components/RouteSwitches'

const App = () => {
  const user = useSelector(state => state.user)

  return (
    <div className = 'container'>
      <Router>
    <div>
      <Notification />
      {user === null ?
        <>
          <h2>Log in to application</h2>
          <LoginForm />
        </>:
        <>
          <NavBar />
          <div className = 'headtitle'><h1>Blogslist App</h1></div><br />
          <RouteSwitches />
        </>
      }
    </div>
    </Router>
  </div>
  )
}

export default App