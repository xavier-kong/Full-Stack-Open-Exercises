const userReducer = (state = null, action) => {
  switch(action.type) {
    case 'SET_USER':
      return {
        ...action.data
      }
    case 'LOGOUT':
      return null
    default:
      return state
  }

}

export const setUser = (user) => {
  return async dispatch => {
    dispatch ({
      type: 'SET_USER',
      data: user
    })
  }
}

export const logoutUser = () => {
  return async dispatch => {
    dispatch ({
      type: 'LOGOUT',
      data: null
    })
  }
}

export default userReducer