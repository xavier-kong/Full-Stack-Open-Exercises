import React from 'react'
import { connect } from 'react-redux'
import { createAnec } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const addAnec = async (event) => {
    event.preventDefault()
    const content = event.target.anec.value
    props.createAnec(content)
    event.target.anec.value = ''
    props.setNotification(`New anecdote ${content}`, 5)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnec}>
        <div><input name='anec' /></div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

const mapDispatchToProps = {
  createAnec,
  setNotification
}

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)
