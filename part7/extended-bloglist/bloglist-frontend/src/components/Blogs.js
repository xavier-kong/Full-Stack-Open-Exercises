import React from 'react'
import Blog from './Blog'
import { blogService } from '../services/blogs'
import { useSelector, useDispatch } from 'react-redux'
import { setErrorMessage } from '../reducers/notificationReducer' 

const Blogs = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  const addLikes = async (newBlog) => {
    try {
      await blogService.update(newBlog)
      dispatch(setErrorMessage(`Liked blog: ${newBlog.title} by ${newBlog.author}`))
    } catch (exception) {
      dispatch(setErrorMessage('Error adding like'))
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
