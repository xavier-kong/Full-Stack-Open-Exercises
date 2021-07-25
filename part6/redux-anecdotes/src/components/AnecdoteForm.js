import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnec } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const addAnec = async (event) => {
    event.preventDefault()
    const content = event.target.anec.value
    dispatch(createAnec(content))
    event.target.anec.value = ''
    dispatch(setNotification(`New anecdote ${content}`, 5))
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

export default AnecdoteForm
