const initialState = {
  content: null
}

let denotifyTimeout = 0

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'NOTIFY':
      return {
        ...state,
        content: action.data
      }
    default:
      return state
  }
}

export const setNotification = (content, time) => {
  return async dispatch => {
    clearTimeout(denotifyTimeout)
    denotifyTimeout = setTimeout(() => {dispatch({
      type: 'NOTIFY',
      data: null
    })}, time*1000)
    
    dispatch({
      type: 'NOTIFY',
      data: content
    })
  }
}

export default notificationReducer