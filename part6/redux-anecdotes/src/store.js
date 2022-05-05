import { configureStore, combineReducers } from "@reduxjs/toolkit"
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from "./reducers/notificationReducer"


const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notification: notificationReducer
})

const store = configureStore({reducer})

export default store