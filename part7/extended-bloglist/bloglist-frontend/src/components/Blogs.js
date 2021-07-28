import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 5,
  paddingBottom: 10,
  border: 'solid',
  borderWidth: 1,
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
      {blogs
        .sort((a, b) => (a.likes - b.likes))
        .map(blog =>
          <div style={ blogStyle } key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title}<br />
            </Link>
          </div>
        )}
    </div>
  )
}

export default Blogs
