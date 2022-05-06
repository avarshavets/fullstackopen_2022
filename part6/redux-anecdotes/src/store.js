import { configureStore, combineReducers } from "@reduxjs/toolkit"
import anecdoteReducer, { setAnecdotes } from './reducers/anecdoteReducer'
import notificationReducer from "./reducers/notificationReducer"
import filterReducer from "./reducers/filterReducer"
import anecdoteService from './services/anecdote_service'


const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer
})

const store = configureStore({reducer})

// we can add all initial anecdotes to store in this file.
// Await only works inside async functions,
// and the code in store.js is not inside a function.
// Thus, we don't necessarily need async-await.
//
// anecdoteService.getAll().then(data => store.dispatch(setAnecdotes(data)))

// It is better, though, to add all initial anecdotes in App using useEffect hook and a Thunk function.
// Thunk functions are defined in the anecdoteReducer.js file.
// In this way, we handle fetching the data from DB and setting the Redux store state in one place.

export default store