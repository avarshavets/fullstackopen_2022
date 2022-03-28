import './App.css';
import { useState } from "react";


const DisplayAnecdote = ({anecdotes, selected}) => (
    <>
        <h1>Anecdote of the day</h1>
        <div>{anecdotes[selected]}</div>
    </>
)

const DisplayMostVoted = ({anecdotes, votes}) => {
    // idxMax with reduce:
    // reduce((accumulatedValue, currValue, currIndex, array) => {...})
    // const idxMax = votes.reduce((idxMax, item, idx, arr) => arr[idxMax] < item ? idx : idxMax, 0);

    const idxMax = votes.indexOf(Math.max(...votes))

    return (
        <>
            <h1>Anecdote with most votes</h1>
            <div>
                {anecdotes[idxMax]}
            </div>
            <div>
                has {votes[idxMax]} votes
            </div>
        </>
    )
}

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>{text}</button>
)


const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
    ]

    const [selected, setSelected] = useState(0)
    const votesInit = new Array(anecdotes.length).fill(0)
    const [votes, setVote] = useState(votesInit)

    const randomNum = () => Math.floor(Math.random() * anecdotes.length)

    const handleAnecdoteClick = (newIdx) => {
        setSelected(newIdx)
        // console.log(newIdx, anecdotes[newIdx])
    }
    const handleVoteClick = (idx) => {
        // correct way of updating state stored in complex data structures like objects and arrays
        // is to make a copy of the state.
        const votesCopy = [...votes]
        votesCopy[idx] += 1
        setVote(votesCopy)
    }

    return (
        <>
            <DisplayAnecdote anecdotes={anecdotes} selected={selected}/>
            <Button handleClick={() => handleVoteClick(selected)} text='vote'/>
            <Button handleClick={() => handleAnecdoteClick(randomNum())} text='next anecdote' />
            <div>
                has {votes[selected]} votes
            </div>
            <DisplayMostVoted anecdotes={anecdotes} votes={votes}/>
        </>
    )
}

export default App;
