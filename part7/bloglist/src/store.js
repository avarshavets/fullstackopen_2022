import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from './reducers/loggedInUserReducer'
import blogReducer from './reducers/blogReducer'
import usersReducer from './reducers/usersReducer'
import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
  user: userReducer,
  blogs: blogReducer,
  users: usersReducer,
  notification: notificationReducer
})

const store = configureStore({ reducer })

export default store