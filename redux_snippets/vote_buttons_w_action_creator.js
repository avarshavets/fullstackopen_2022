import React from 'react';
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'

// state is a dictionary / object
const initialState = {
    good: 0,
    ok: 0,
    bad: 0
}

// action creator function for a vote event
// action is an object with a type field describing the event,
// and additional info needed to perform the event:
// in our case, no additional data is needed
const voteActionCreator = (inputType) => {
    return {
        type: inputType
    }
}

// reducer is a function that returns a NEW state based on the current state and an action.
const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GOOD':
            // create a copy of state obj and then modify state.good value
            return {...state, good: state.good + 1}
        case 'OK':
            return {...state, ok: state.ok + 1}
        case 'BAD':
            return {...state, bad: state.bad + 1}
        case 'ZERO':
            return {...state, good: 0, bad: 0, ok: 0}
        default:
            return state
    }
}

// Reducer is never supposed to be called directly from the applications code.
// Reducer is only given as a parameter to the createStore()
// store can dispatch actions to update the state --> store.dispatch()
// store can get a current state --> getState()
const store = createStore(counterReducer)

// selector function that extracts value of good votes
// selectors are typically written for more complicated extractions, e.g.:
// with data filters, etc.
const selectGoodValue = state => state.good

const App = () => {
    const handleVoteClick = (type) => {
        store.dispatch(voteActionCreator(type))
    }

    return (
        <div>
            <button onClick={() => handleVoteClick('GOOD')}>good</button>
            <button onClick={() => handleVoteClick('OK')}>ok</button>
            <button onClick={() => handleVoteClick('BAD')}>bad</button>
            <button onClick={() => handleVoteClick('ZERO')}>reset stats</button>
            <div>good { selectGoodValue(store.getState())}</div>
            <div>ok { store.getState().ok }</div>
            <div>bad { store.getState().bad }</div>
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
// function that renders the content of the App
const renderApp = () => {
    root.render(<App />)
}

// initial rendering
renderApp()
// When the state in the store is changed,
// React is not able to automatically rerender the application.
// Thus, we add a change listener to the App (or component)
// by subscribing the App to the store updates.
// renderApp is a callback function that will be called
// immediately after the store updates.
// In our case, the callback function causes the rendering of the UI.
store.subscribe(renderApp)



