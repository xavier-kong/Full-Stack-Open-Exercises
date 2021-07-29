import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { setErrorMessage } from '../reducers/notificationReducer'
import { initializeBlogs, likeBlog, deleteBlog } from '../reducers/blogReducer'
import CommentForm from './CommentForm'
import { Button } from 'react-bootstrap'
import { FaThumbsUp } from 'react-icons/fa'

const Blog = () => {
  const id = useParams().id
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogs = useSelector(state => state.blogs)
  const blog = blogs.find(blog => blog.id === id)
  const user = useSelector(state => state.user)

  const addLike = event => {
    event.preventDefault()
    let newBlog = blog
    newBlog.likes += 1
    try {
      dispatch(likeBlog(newBlog))
      dispatch(setErrorMessage(`Liked blog: ${newBlog.title} by ${newBlog.author}`))
    } catch (exception) {
      dispatch(setErrorMessage('Error adding like'))
    }
  }

  const deleteBlogs = event => {
    event.preventDefault()
    if (window.confirm(`Are you sure you want to delete ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog)
    }
    try {
      const temp = blog
      dispatch(deleteBlog(blog))
      dispatch(setErrorMessage(`Deleted blog: ${temp.title} by ${temp.author}`))
    } catch (exception) {
      dispatch(setErrorMessage('Error deleting blogs'))
    }
  }

  while (!blog) {
    return null
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <div>url: {blog.url}</div><br />

      <div id='bloglikes'>likes: {blog.likes}&nbsp;
        <Button onClick={addLike} id='likebutton'>
          like <FaThumbsUp />
        </Button>
      </div><br />

      {((blog.user!==undefined) 
        ? <div>Added by {blog.user.name}</div> 
        : <div>User not found</div>)}

      <div>
        {((blog.user && user.name === blog.user.name)) 
        ? <Button onClick={deleteBlogs} id='deletebutton'>delete</Button> 
        : null}
      </div>
      <div>
          <h2>comments</h2>
          <CommentForm blogId={id} />
          <ul>
            {blog.comments
              .map(comment => 
                <li key={comment.id}>{comment.comment}</li>
              )}
          </ul>
      </div>  
    </div>
  )
}


export default Blog
