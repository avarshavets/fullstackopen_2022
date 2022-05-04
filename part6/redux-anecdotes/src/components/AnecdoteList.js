// hooks to connect the App to the Store, and namely to: dispatch() selector functions
import {useDispatch, useSelector} from "react-redux";
import {voteActionCreator} from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
    const dispatch = useDispatch()

    const anecdotes = useSelector(state => []
        // create a copy of an obj list
        .concat(state)
        // do in-place sort
        .sort((a, b) => {
        return b.votes - a.votes
        })
    )

    const handleVoteClick = (id) => {
        dispatch(voteActionCreator(id))
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
                        <button onClick={() => handleVoteClick(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList