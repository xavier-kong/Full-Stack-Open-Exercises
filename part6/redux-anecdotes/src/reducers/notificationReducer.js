const initialState = {
  content: 'default notification state',
  id: 10000000,
  votes: 0

}

const notificationReducer = (state = initialState.content, action) => {
  switch(action.type) {
    case 'NOTIFY':
      return (
        state
      )
    default:
      return state
  }
}

export const notifyAnec = (anec) => {
  return {
    type: 'NOTIFY',
    data: { anec }
  }
}
export default notificationReducer
