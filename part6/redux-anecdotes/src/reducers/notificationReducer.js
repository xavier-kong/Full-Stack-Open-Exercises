const initialState = {
  content: ''
}

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'NOTIFY_VOTE':
      return {
        ...state,
        content: `You voted for ${action.data}`
      }
    case 'NOTIFY_ADD':
      return {
        ...state,
        content: `You added ${action.data}`
      }
    case 'DENOTIFY':
      return {
        ...state,
        content: ''
      }
    default:
      return state
  }
}

export const notifyVote = (anec) => {
  return {
    type: 'NOTIFY_VOTE',
    data: anec
  }
}

export const denotify = () => {
  return {
    type: 'DENOTIFY'
  }
}

export const notifyAdd = (anec) => {
  return {
    type: 'NOTIFY_ADD',
    data: anec
  }
}

export default notificationReducer
