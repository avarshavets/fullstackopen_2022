// hooks to connect the App to the Store, and namely to: dispatch() selector functions
import { useSelector, useDispatch } from 'react-redux'
import { voteActionCreator, addAnecdoteActionCreator } from "./reducers/anecdoteReducerWithActionCreator"

const App = () => {
    // get a list of anecdote objects and order by number of votes
    const anecdotes = useSelector(state => []
        // create a copy of an obj list
        .concat(state)
        // do in-place sort
        .sort((a, b) => {
            return b.votes - a.votes
        })
    )

    const dispatch = useDispatch()

    const handleVoteClick = (id) => {
        // --- Define Dispatch w/o Action Creator ---
        // update the state in the store with dispatch.
        // dispatch an action telling how to update the state -->
        // an action type 'vote' and data needed to perform the update of the state.
        // the actual update logic for vote event is defined in reducer
        // dispatch({
        //     type: 'vote',
        //     data: { id }
        // })
        // --- Define Dispatch using Action Creator ---
        dispatch(voteActionCreator(id))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // because input field has a name,
        // we can access the content via the event object event.target.fieldName.value
        const anecdote = e.target.anecdote.value
        // reset input field
        e.target.anecdote.value = ''
        dispatch(addAnecdoteActionCreator(anecdote))
    }

    return (
        <div>
            <h2>Anecdotes</h2>
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
            <h2>create new</h2>
            <form onSubmit={handleSubmit}>
                <div><input name='anecdote'/></div>
                <button>create</button>
            </form>
        </div>
    )
}

export default App