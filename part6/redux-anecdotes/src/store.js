import anecdoteReducer, { initializeAnecdotes } from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import anecdoteService from './services/anecdotes'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
  )

anecdoteService.getAll().then(anecdotes =>
    store.dispatch(initializeAnecdotes(anecdotes))
  )

export default store