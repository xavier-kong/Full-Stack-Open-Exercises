import React, { useState } from 'react'
import { addComment } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { Button, Form } from 'react-bootstrap'

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
      <Form onSubmit={addComments}>
        <Form.Group>
          <Form.Control
            type="text"
            value={comment}
            name="comment"
            onChange={({ target }) => setComment(target.value)}
          /><br />
          <Button type="submit">add comment</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default CommentForm
