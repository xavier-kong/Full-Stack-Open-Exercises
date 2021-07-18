import React, { useState } from 'react'

const Blog = ({ blog, addLikes, user, deleteBlogs }) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 5,
    paddingBottom: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLike = event => {
    event.preventDefault()
    let newBlog = blog
    newBlog.likes += 1
    addLikes(newBlog)
  }

  const deleteBlog = event => {
    event.preventDefault()
    if (window.confirm(`Are you sure you want to delete ${blog.title} by ${blog.author}`)) {
      deleteBlogs(blog)
    }
  }
      
  return (
    <div style ={blogStyle}>
      <div>  
        {blog.title} {blog.author} &nbsp;
        <button onClick={toggleVisibility} style={hideWhenVisible}>view</button>
        <button onClick={toggleVisibility} style={showWhenVisible}>cancel</button>  
      </div>
      <div style={showWhenVisible}>
        <ul className = 'blogdetails'>
          <li>{blog.url}</li>
          <li>likes: {blog.likes} <button onClick={addLike}>like</button></li>
          <li>{(blog.user) ? blog.user.name : "User not found"}</li>
          <li>{((blog.user && user.name === blog.user.name)) ? <button onClick={deleteBlog}>delete</button> : null}</li>
        </ul>
      </div>
    </div>
  )
}
export default Blog