import React, {useState} from 'react'

const AddBlogs = ({ newBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    newBlog({
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
