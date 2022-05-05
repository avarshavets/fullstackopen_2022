import { configureStore, combineReducers } from "@reduxjs/toolkit"
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from "./reducers/notificationReducer"
import filterReducer from "./reducers/filterReducer"


const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer
})

const store = configureStore({reducer})

export default store