import { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

// code for communication with the json-db server as a custom hook function
// purpose of this hook to encapsulate reusable code that is used for notes and persons
// without the useResource code for service must be duplicated for notes and persons
// (as notes_services and persons_services)
const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  const getAll = () => {
    axios.get(baseUrl).then(response => setResources(response.data))
  }

  // resource is an object to be added to json object list (nodes or persons)
  const create = (resource) => {
    axios
        .post(baseUrl, resource)
        .then(returnedObj => {
          setResources(resources.concat(returnedObj))
        })
  }

  const service = {
    getAll,
    create
  }

  // we can also return an object with 2 key-value pairs
  // however, when we use this hook in the App,
  // we use deconstruction of parameters and assign then to variables with different name as:
  // const [notes, noteService] = useResource('http://localhost:3005/notes')
  // we wouldn't be able to rename the variables when using an object.
  // in case of an object it would have been the following:
  // const notes = useResources(...)
  // where notes.resources - list of notes, notes.service - object of functions
  return [
    resources, service
  ]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')
  // const a_list = []
  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  useEffect(() => {
    noteService.getAll()
    personService.getAll()
  }, [notes, persons])

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App