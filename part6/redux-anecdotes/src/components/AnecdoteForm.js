import { useDispatch } from "react-redux"
import { addAnecdote } from "../reducers/anecdoteReducer"
import { notificationChange, removeNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        // because input field has a name,
        // we can access the content via the event object event.target.fieldName.value
        const anecdote = e.target.anecdote.value
        // reset input field
        e.target.anecdote.value = ''
        dispatch(addAnecdote(anecdote))
        dispatch(notificationChange(`you created '${anecdote}'`))
        setTimeout(() => {
            dispatch(removeNotification())
            }, 3000)
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