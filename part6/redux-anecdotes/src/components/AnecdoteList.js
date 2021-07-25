import React from 'react'
import { addVote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const anecFilter = useSelector(state => state.filter)
  const dispatch = useDispatch()
  const vote = anecdote => {
    dispatch(addVote(anecdote))
    dispatch(setNotification(`You voted for ${anecdote.content}`, 5))
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
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList
