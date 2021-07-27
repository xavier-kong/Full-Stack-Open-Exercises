import React, { useState, useEffect, useRef } from 'react'
import Blog from './Blog'
import { blogService } from '../services/blogs'
import { useSelector, useDispatch } from 'react-redux'
import { setErrorMessage } from '../reducers/notificationReducer'
import { createBlog, initializeBlogs, likeBlog, deleteBlog } from './reducers/blogReducer'

const Blogs = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogs = useSelector(state => state.blogs)

  const addLikes = async (newBlog) => {
    try {
      dispatch(likeBlog(newBlog))
      dispatch(setErrorMessage(`Liked blog: ${newBlog.title} by ${newBlog.author}`))
    } catch (exception) {
      dispatch(setErrorMessage('Error adding like'))
    }
  }

  const deleteBlogs = async (blog) => {
    try {
      const temp = blog
      dispatch(deleteBlog(blog))
      dispatch(setErrorMessage(`Deleted blog: ${temp.title} by ${temp.author}`))
    } catch (exception) {
      dispatch(setErrorMessage('Error deleting blogs'))
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      {blogs
        .sort((a, b) => (a.likes - b.likes))
        .map(blog =>
          <Blog key={blog.id} blog={blog} addLikes={addLikes} user={user} deleteBlogs={deleteBlogs}/>
        )}
    </div>
  )
}

export default Blogs
