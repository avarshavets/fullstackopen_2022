// Fetch data from the server with axios.get() method.
// Post data to the server with axios.post() method.
// Modify a single note data and replace the entire note with axios.put request.
// Alternatively HTTP PATCH request can change some of the note's properties that were modified.

import {useEffect, useState} from "react";
import axios from "axios";

const Note = ({note}) => (<li>{note.content}</li>)

const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('')

    useEffect(() => {
        axios
            .get('http://localhost:3002/notes')
            .then(response => {
                setNotes(response.data)
            })
    }, [])

    // 1). Create a new object for the note BUT OMIT !!! the 'id' property.
    //     It's better to let the server generate ids for the resources (data).
    // 2). Send the new note object to the server with axios POST method.
    // 3). Update the newNote state with a new note object. REMEMBER: always create a copy of an object!!!
    const addNote = (event) => {
        event.preventDefault()
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() > 0.5
        }

        axios
            .post('http://localhost:3002/notes', noteObject)
            .then(response => {
                console.log(response)
                setNotes(notes.concat(response.data))
                // reset the newNote state to empty, since form's input value=newNote
                setNewNote('')
            })
    }

    const handleNoteChange = (event) => {setNewNote(event.target.value)}

    // 1) Change the 'importance' property of the note with a specified id
    //    NOTE: changedNote is a copy of a note to be modified --> NEVER MUTATE STATE directly in React!!!
    // 2) Modify the changed note on the server with axios.put() method, which replaces an entire note on the server
    // 3) Update the state with notes list with a new modified note object
    const toggleImportanceOf = (id) => {
        const url = `http://localhost:3002/notes/${id}`
        const note = notes.find(n => n.id === id)
        const changedNote = {...note, important: !note.important}

        axios
            .put(url, changedNote)
            .then(response => {
                setNotes(notes.map(note => note.id !== id ? note : response.data))
            })
    }

    return (
        <div>
            <h1>Notes</h1>
            <ul>
                {notes.map(note =>
                    <Note
                        key={note.id}
                        note={note}
                        toggleImportance={()=>toggleImportanceOf(note.id)}
                    />)}
            </ul>
            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNoteChange} />
                <button type="submit">save</button>
            </form>
        </div>
    )
}

export default App;
