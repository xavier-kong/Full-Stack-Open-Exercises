import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { getAllUsers } from '../reducers/usersReducer'
import { Table } from 'react-bootstrap'

const User = () => {
  const id = useParams().id
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])

  const users = useSelector(state => state.users)
  const user = users.find(user => user.id === id)

  while (!user) {
    return (
      null
    )
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <h3>added blogs</h3>
      <Table>
        <tbody>
          {user.blogs.map(blog => 
            <tr key={blog.id}>
              <td>
                {blog.title}
              </td>
            </tr>
            )}
        </tbody>
      </Table>
    </div>
  )
}

export default User
