import blogService from '../services/blogs'

const blogReducer = (state=[], action) => {
  switch(action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'CREATE':
      return state.concat(action.data)
    case 'DELETE':
      return state.filter((blog) => blog.id !== action.data.id )
    case 'LIKE':
      const id = action.data.id
      const blogToChange = state.find(n => n.id === id)
      const changedBlog = { 
        ...blogToChange, 
        votes: blogToChange.votes + 1
      }
      return state.map(blog =>
        blog.id !== id ? blog : changedBlog 
      )
    default:
      return state
  }

}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const createBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'CREATE',
      data: newBlog,
    })
  }
}

export const likeBlog = blog => {
  return async dispatch => {
    const likedBlog = await blogService.update(blog)
    dispatch({
      type: 'LIKE',
      data: likedBlog
    })
  }
}

export const deleteBlog = blog => {
  return async dispatch => {
    await blogService.remove(blog)
    dispatch({
      type: 'DELETE',
      data: blog
    })
  } 
}


export default blogReducer