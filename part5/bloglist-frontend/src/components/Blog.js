import React, { useState } from 'react'

const Blog = ({ blog, addLikes }) => {
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

  const addLike = async (event) => {
    event.preventDefault()
    let newBlog = blog
    newBlog.likes += 1
    addLikes(newBlog)
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
        </ul>
      </div>
    </div>
  )
}
export default Blog