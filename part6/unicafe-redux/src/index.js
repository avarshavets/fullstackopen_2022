import React from 'react';
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import reducer from './reducer'
import { selectGoodValue, voteActionCreator } from "./reducer";

const store = createStore(reducer)

const App = () => {
    const handleVoteClick = (type) => {
        store.dispatch(voteActionCreator(type))
    }

    return (
        <div>
            <button onClick={() => handleVoteClick('GOOD')}>good</button>
            <button onClick={() => handleVoteClick('OK')}>ok</button>
            {/*  alternatively */}
            <button onClick={() => store.dispatch({ type: 'BAD' })}>bad</button>
            <button onClick={() => store.dispatch({ type: 'ZERO' })}>reset stats</button>
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