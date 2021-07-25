const initialState = {
  content: null
}

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'NOTIFY':
      return {
        ...state,
        content: action.data
      }
    case 'DENOTIFY':
      return {
        ...state,
        content: null
      }
    default:
      return state
  }
}

export const denotify = () => {
  return {
    type: 'DENOTIFY'
  }
}

export const setNotification = (content, time) => {
  return async dispatch => {
    dispatch({
      type: 'NOTIFY',
      data: content
    })

    setTimeout(() => {dispatch(denotify())}, time*1000)
  }
}

export default notificationReducer