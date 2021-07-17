import React from 'react'

const AddBlogs = ({ title, setTitle, author, setAuthor, url, setUrl, addBlog }) => {
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
        />
      </div>
      <div>
        author&nbsp;
          <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url&nbsp;
          <input
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
      </form> 
    </>
  )
}

export default AddBlogs
