import React, { useState } from 'react'
import { addComment } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const CommentForm = ({ blogId }) => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const addComments = event => {
    event.preventDefault()
    dispatch(addComment({
      id: blogId,
      comment: comment
    }))
    setComment('')
  }

  return (
    <div>
      <form onSubmit={addComments}>
        <div>
          <input
            type="text"
            value={comment}
            name="comment"
            onChange={({ target }) => setComment(target.value)}
          />
          <button type="submit">add comment</button>
        </div>
      </form>
    </div>
    
  )
}

export default CommentForm
