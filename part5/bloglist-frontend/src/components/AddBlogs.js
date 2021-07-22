import React, { useState } from 'react'
import PropTypes from 'prop-types'

const AddBlogs = ({ addNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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

AddBlogs.propTypes = {
  addNewBlog: PropTypes.func.isRequired
}

export default AddBlogs
