import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllUsers } from '../reducers/usersReducer'
import { Link } from 'react-router-dom'

const User = ({ user, blogs }) => {
  return (
      <tr>
        <th id = 'table_user_name'><Link to={`/users/${user.id}`}>{user.name}</Link></th>
        <th>{blogs}</th>
      </tr>
  )
}

const UserView = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])

  const users = useSelector(state => state.users)

  return (
    <div>
      <h1>Users</h1>
      <table id = 'user_view_table'>
        <tbody>
          <tr id = 'table_heading'>
            <th id = 'table_user_name'>user names</th>
            <th>blogs created</th>
          </tr>
          {users
          .sort((a, b) => (a.blogs.length - b.blogs.length))
          .map(user =>
            <User key={user.id} user={user} blogs={user.blogs.length}/>
          )}
        </tbody> 
      </table>
    </div>
  )
}

export default UserView

