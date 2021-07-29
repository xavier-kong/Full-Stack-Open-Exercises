import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 5,
  paddingBottom: 10,
  marginBottom: 5
}

const Blogs = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogs = useSelector(state => state.blogs)

  return (
    <div>
      <h2>blogs</h2>
      <Table striped>
        <tbody>
      {blogs
        .sort((a, b) => (a.likes - b.likes))
        .map(blog =>
          <tr style={ blogStyle } key={blog.id}>
            <td>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title}<br />
            </Link>
            </td>
          </tr>
        )}
        </tbody>
      </Table>
      
    </div>
  )
}

export default Blogs
