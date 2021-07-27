import notificationReducer from './reducers/notificationReducer'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const store = createStore(
  notificationReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  ))

export default store