import anecdoteReducer from './anecdoteReducer'
import notificationReducer from './notificationReducer'
import filterReducer from './filterReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers } from 'redux'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer
})

const store = createStore(
  reducer,
  composeWithDevTools()
  )

export default store