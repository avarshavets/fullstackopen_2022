import React from 'react';
import ReactDOM from 'react-dom/client'
import { configureStore, createSlice } from "@reduxjs/toolkit"

const initialState = {
    good: 0,
    ok: 0,
    bad: 0
}
const counterSlice = createSlice({
    // name of the state slice (piece of state) that will be handled by the reducer
    // name also defines the prefix which is used in the action's type value (e.g.: counter/increment)
    name: 'counter',
    initialState,
    reducers: {
        // reducers is an object of 'case reducers' similar to a case in a switch statement of a single reducer
        // reducers: { rFunction1(), rFunction2() } <--> reducers: {'rFunction1': rFunction1(), 'rFunction2': rFunction2() }
        // functions of reducer object handle state changes caused by an action
        // the key (name of a function) generates action's type value --> --> counter/increment
        incrementGood(state, action) {
            // createSlice utilizes Immer, which allows to write 'mutating' immutable updates (Immer will create a new copy itself)
            state.good = state.good + 1
            return state
            },
        incrementOk(state, action) {
            // we can also update the state in traditional way by creating a copy and replacing the state with it
            return {...state, ok: state.ok + 1}
        },
        incrementBad(state, action) {
            return {...state, bad: state.bad + 1}
        },
        resetVote(state) {
            return { ...state, good: 0, bad: 0, ok: 0}
            // alternatively --> return { good: 0, bad: 0, ok: 0}
        }
    }
})

// reducer can contain multiple 'slice reducers' combined together with combineReducer()
// for example:
// const reducer = combineReducers( {
//   counter: counterSlice.reducer,
//   user: userSlice.reducer,
// } )
// counter is the piece of state handled by counterReducer (the name is also indicated in counterReducer)
const counterReducer = counterSlice.reducer
// configureStore accepts a single object parameter that includes: reducer, middleware..., etc.
// reducer can be a single function or an object of slice reducers, such as: {counter: counterReducer, user: userReducer}
// slice reducers will be automatically passed to combineReducers() or can be combined beforehand in a code
const store = configureStore({ counterReducer })

const selectGoodValue = state => state.good

const App = () => {
    const handleClick = (button) => {
        // Note: action creators by default accept a single argument, which then becomes action.payload.
        // for example:
        // dispatch(increment('good')) <--> dispatch({ type: 'counter/increment', payload: 'good'})
        if (button === 'good') {
            store.dispatch(counterSlice.actions.incrementGood())
        }
        else if (button === 'ok') {
            store.dispatch(counterSlice.actions.incrementOk())
        }
        else if (button === 'bad') {
            store.dispatch(counterSlice.actions.incrementBad())
        }
        else if (button === 'zero') {
            store.dispatch(counterSlice.actions.resetVote())
        }
    }

    return (
        <div>
            <button onClick={() => handleClick('good')}>good</button>
            <button onClick={() => handleClick('ok')}>ok</button>
            <button onClick={() => handleClick('bad')}>bad</button>
            <button onClick={() => handleClick('zero')}>reset stats</button>
            <div>good { selectGoodValue(store.getState())}</div>
            {/*  alternatively w/o a selector function */}
            <div>ok { store.getState().ok }</div>
            <div>bad { store.getState().bad }</div>
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => {
    root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
