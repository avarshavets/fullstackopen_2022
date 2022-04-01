// Extracting Communication with the Backend into a Separate Module

// A separate module stored in notes.js in src/services/ directory
import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

// The module returns an object that has three functions
// (getAll, create, and update) as its properties that deal with notes.
// NOTE: the functions DO NOT RETURN THE PROMISE with the HTTP response.
// Instead the functions RETURNS response DATA directly --> !!! response.data !!!
// (it is not mandatory though).
export default {
    getAll: getAll,
    create: create,
    update: update
}
// OR alternatively in case when keys = values
export default { getAll, create, update }

// Updates in the App component that allows to use functions in notes.js components
// 1) Import object with its methods as a variable noteService:
//    object provides methods: noteService.getAll(), noteService.creat(), and noteService.update()
// 2) Update axios methods with noteService methods.

import noteService from './services/notes'

const App = () => {
    // ...

    useEffect(() => {
        noteService
            .getAll()
            .then(initialNotes => {setNotes(initialNotes)})
    }, [])

    const toggleImportanceOf = id => {
        const note = notes.find(n => n.id === id)
        const changedNote = { ...note, important: !note.important }

        noteService
            .update(id, changedNote)
            .then(returnedNote => {
                setNotes(notes.map(note => note.id !== id ? note : returnedNote))
            })
    }

    const addNote = (event) => {
        event.preventDefault()
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() > 0.5
        }

        noteService
            .create(noteObject)
            .then(returnedNote => {
                setNotes(notes.concat(returnedNote))
                setNewNote('')
            })
    }

    // ...
}

export default App