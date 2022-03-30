// Form: Add note
// - newNote state piece stores the input value of the form;
// - value attribute of the form's input is set to newNote --> form element is a controlled component now;
// - event handler updates newNote state piece with onChange event;
// - value of newNote is added to the notes array stored in the state piece 'note' onSubmit event;
//
// Form: Filter notes to display
// - piece of state 'showAll' keeps track of which notes should be displayed, e.g.: important or all;
// - button with event handler switches the 'showAll' state piece between True and False, and thus filters notes.


import { useState } from 'react'

const Note = ({ note }) => {
    return (
        <li>{note.content}</li>
    )
}

const App = () => {
    const notesInit = [
        {
            id: 1,
            content: 'HTML is easy',
            date: '2019-05-30T17:30:31.098Z',
            important: true
        },
        {
            id: 2,
            content: 'Browser can execute only JavaScript',
            date: '2019-05-30T18:39:34.091Z',
            important: false
        },
        {
            id: 3,
            content: 'GET and POST are the most important methods of HTTP protocol',
            date: '2019-05-30T19:20:14.298Z',
            important: true
        }
    ]
    const [notes, setNotes] = useState(notesInit)
    const [newNote, setNewNote] = useState('')
    const [showAll, setShowAll] = useState(true)

    const handleNoteChange = (event) => {
        setNewNote(event.target.value)
    }

    const addNote = (event) => {
        // prevents default action of submitting a form as well as reloading the page, among other things.
        event.preventDefault()
        // create note object
        const noteObj = {
            content: newNote,
            date: new Date().toISOString(),
            // Math.random() < 0.5 returns True or False
            important: Math.random() < 0.5,
            // id is generated based on total number of notes in the array.
            // Note: It works because notes are never deleted!!
            id: notes.length + 1
        }
        setNotes(notes.concat(noteObj))
        // resets the input field after submit click
        setNewNote('')
    }
    // true ? show all notes : else filter important
    const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

    return (
        <div>
            <h1>Notes</h1>
            <div>
                <button onClick={()=>setShowAll(!showAll)}>
                    {/* if true (show all notes) --> button displays 'show important', else --> 'show all'*/}
                    show {showAll ? 'important' : 'all'}
                </button>
            </div>
            <ul>
                {notesToShow.map(note =>
                    <Note key={note.id} note={note} />
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

export default App;
