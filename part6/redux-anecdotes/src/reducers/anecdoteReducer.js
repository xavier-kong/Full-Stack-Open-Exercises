const reducer = (state = [], action) => {
  switch(action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecToChange = state.find(n => n.id === id)
      const changedAnec = { 
        ...anecToChange, 
        votes: anecToChange.votes + 1
      }
      return state.map(anec =>
        anec.id !== id ? anec : changedAnec 
      )
    case 'CREATE':
      return state.concat(action.data)
    case 'INIT_ANECS':
      return action.data
    default:
      return state
  }
}

export const initializeAnecdotes = (anecs) => {
  return {
    type: 'INIT_ANECS',
    data: anecs,
  }
}

export const addVote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const createAnec = (data) => {
  return {
    type: 'CREATE',
    data,
  }
}

export default reducer