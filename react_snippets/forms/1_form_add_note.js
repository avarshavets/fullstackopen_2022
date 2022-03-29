// Elements such as Form keep their own internal state and update it based on user input.
// React mutable states is kept in the state property and updated with setState()
// We make React component a 'single source of truth' and
// it will control the form element:
//      - we create a React's state for storing the user-submitted input;
//      - we set this state as the value attribute of the form's input;
//      - react component now controls the behaviour of the input element;
//      - adding an event handler to the input field will enable editing the form's input element
//        and will update the components state correspondingly.

// Example:
// A user inputs a note in a form. All notes are displayed in the app.
// - newNote state piece stores the input value of the form;
// - value attribute of the form's input is set to newNote --> form element is a controlled component now;
// - event handler updates newNote state piece with onChange event;
// - value of newNote is added to the notes array stored in the state piece 'note' onSubmit event.


import { useState } from 'react'

const Note = ({ note }) => {
    return (
        <li>{note}</li>
    )
}

const App = () => {
    const notesInit = ['a', 'b', 'c']

    const [notes, setNotes] = useState(notesInit)
    const [newNote, setNewNote] = useState('')

    const handleNoteChange = (event) => {
        setNewNote(event.target.value)
    }

    const addNote = (event) => {
        // prevents default action of submitting a form as well as reloading the page, among other things.
        event.preventDefault()
        setNotes(notes.concat(newNote))
        // resets the input field after submit click
        setNewNote('')
    }

    return (
        <div>
            <h1>Notes</h1>
            <ul>
                {notes.map(note =>
                    <Note key={notes.length + 1} note={note} />
                )}
            </ul>
            <form onSubmit={addNote}>
                <input value={newNote} placeholder={'add a note...'}
                       onChange={handleNoteChange}/>
                <button type="submit">save</button>
            </form>
        </div>
    )
}

