import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const message = useSelector(state => state.notification.content)

  if (message === null) {
    return null
  }

  return (
    <div className="container">
      {(message && <Alert variant='info'>{message}</Alert>)}
    </div>
  )
}

export default Notification


