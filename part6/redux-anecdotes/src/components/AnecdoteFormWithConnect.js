import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"
import { connect } from "react-redux";

const AnecdoteForm = (props) => {
    // const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        // because input field has a name,
        // we can access the content via the event object event.target.fieldName.value
        const anecdote = e.target.anecdote.value
        // reset input field
        e.target.anecdote.value = ''
        props.createAnecdote(anecdote)
        props.setNotification(`you created '${anecdote}'`, 3000)
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

// function returns a map with a prop as action creator name and action creator function.
// since { createAnecdote: createAnecdote }, we can write simply { createAnecdote }.
// Note: connect modifies the action creator function into a form that contains the dispatch.
// So calling props.setAnecdote will actually call dispatch(setAnecdote)
const mapDispatchToProps = {
    createAnecdote,
    setNotification
}

// export default connect(
//     null,   // mapStateToProps is not used, thus passed as null
//     mapDispatchToProps
// )(AnecdoteForm)

// alternatively
const AnecdoteFormConnected = connect(
    null,   // mapStateToProps is not used, thus passed as null
    mapDispatchToProps
)(AnecdoteForm)

// map of action creators in mapDispatchToProps can be also put directly into connect
// const AnecdoteFormConnected = connect(
//     null,
//     {
//         createAnecdote,
//         setNotification
//     }
// )(AnecdoteForm)

export default AnecdoteFormConnected