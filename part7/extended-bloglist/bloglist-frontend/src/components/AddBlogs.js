import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setErrorMessage } from '../reducers/notificationReducer' 
import Togglable from './Togglable'

const AddBlogs = React.forwardRef((props, ref) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()
  

  const addNewBlog = async (newBlog) => {
    ref.current.toggleVisibility()
    try {
      dispatch(createBlog(newBlog))
      dispatch(setErrorMessage(`Added new blog: ${newBlog.title} by ${newBlog.author}`))
    } catch (exception) {
      dispatch(setErrorMessage('Error adding blogs'))
    }
  }

  const addBlog = async (event) => {
    event.preventDefault()
    addNewBlog({
      title: title,
      author: author,
      url: url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
        title&nbsp;
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
            id="title"
          />
        </div>
        <div>
        author&nbsp;
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
            id="author"
          />
        </div>
        <div>
        url&nbsp;
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
            id="url"
          />
        </div>
        <button type="submit" id='submitblog'>create</button>
      </form>
    </>
  )
}
)

const BlogForm = () => {
  const blogFormRef = useRef() 
  return (
    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
      <AddBlogs ref={blogFormRef}/>
    </Togglable>
  )
}

export default BlogForm
