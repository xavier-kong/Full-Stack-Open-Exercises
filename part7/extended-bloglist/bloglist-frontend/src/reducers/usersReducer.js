import blogService from '../services/blogs'

const usersReducer = (state=[], action) => {
  switch(action.type) {
    case 'GET_USERS':
      return action.data
    default:
      return state
  }

}

export const getAllUsers = () => {
  return async dispatch => {
    const users = await blogService.getUsers()
    dispatch({
      type: 'GET_USERS',
      data: users,
    })
  }
}

export default usersReducer