import {useDispatch} from "react-redux"
import {addAnecdoteActionCreator} from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {
    const dispatch = useDispatch()

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
            <h2>create new</h2>
            <form onSubmit={handleSubmit}>
                <div><input name='anecdote'/></div>
                <button>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm