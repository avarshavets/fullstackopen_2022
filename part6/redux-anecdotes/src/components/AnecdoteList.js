import { useDispatch, useSelector } from "react-redux"
import { updateVote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
    const dispatch = useDispatch()

    const filterText = useSelector(state => state.filter)

    const anecdotesFiltered = useSelector(state =>
        state.anecdotes.filter(a => a.content.includes(filterText)))

    // anecdotes to be displayed in the order sorted by votes
    const anecdotes = anecdotesFiltered.sort((a, b) => {
        return b.votes - a.votes
    })


    const handleVoteClick = (anecdoteObj) => {
        dispatch(updateVote(anecdoteObj))
        dispatch(setNotification(`you voted '${anecdoteObj.content}'`, 3000))
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