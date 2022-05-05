// hooks to connect the App to the Store, and namely to: dispatch() selector functions
import { useDispatch, useSelector } from "react-redux"
import { voteActionCreator } from "../reducers/anecdoteReducer"
import { notificationChange, removeNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
    const dispatch = useDispatch()

    const anecdotes = useSelector(state => []
        // create a copy of an obj list
        .concat(state.anecdotes)
        // do in-place sort
        .sort((a, b) => {
        return b.votes - a.votes
        })
    )

    const notification = useSelector(state => state.notification)

    const handleVoteClick = (anecdote) => {
        dispatch(voteActionCreator(anecdote.id))
        dispatch(notificationChange(`you voted '${anecdote.content}'`))
        setTimeout(() => {
            dispatch(removeNotification())
        }, 3000)

    }

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVoteClick(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList