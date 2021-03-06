import React from 'react'
import PropTypes from 'prop-types'

export const LoginForm = ({ handleLogin, username, setUsername, password, setPassword }) => {
  return (
    <>
      <form onSubmit={handleLogin}>
        <div>
        username&nbsp;
          <input
            id='usernamefield'
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
        password&nbsp;
          <input
            id='passwordfield'
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" id='loginsubmit'>login</button>
      </form>
    </>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired
}

export default LoginForm