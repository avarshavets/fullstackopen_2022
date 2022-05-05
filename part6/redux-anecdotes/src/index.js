import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from "@reduxjs/toolkit"
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from "./reducers/notificationReducer"

import App from './App'

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notification: notificationReducer
})

const store = configureStore({ reducer })

ReactDOM.createRoot(document.getElementById('root')).render(
  // <Provider> component from react-redux library makes the Redux store available
  // to any nested components that need to access the Redux store.
  <Provider store={store}>
    <App />
  </Provider>
)
