import React from 'react'
import { addVote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import { notifyVote, denotify } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const anecFilter = useSelector(state => state.filter)
  const dispatch = useDispatch()
  const vote = (id, content) => {
    dispatch(addVote(id))
    dispatch(notifyVote(content))
    setTimeout(() => {dispatch(denotify())}, 5000)
  }

  return (
    <>
      {anecdotes
        .filter(anec => anec.content.toLowerCase().includes(anecFilter.toLowerCase()))
        .sort((a, b) => (a.votes - b.votes))
        .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}&nbsp;
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList
