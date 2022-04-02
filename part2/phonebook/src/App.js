import axios from "axios";
import { useState, useEffect } from 'react';
import personService from './services/person_service'


const PersonInfo = ({person, removePerson} ) => (
    <p>
        {person.name} {person.num}<span> </span>
        <button onClick={() => {removePerson(person)} }>
            delete
        </button>
    </p>
    )


const DisplayPersons = ({ filteredPersons, removePerson }) => (
        <div>
            {filteredPersons.map(item =>
                <PersonInfo key={item.id} person={item} removePerson={removePerson} />
            )}
        </div>
    )


const Filter = ({filterText, handleFilterChange}) => (
    <div>
        filter shown with <input value={filterText}
                                 onChange={handleFilterChange}/>
    </div>
)


const PersonForm = ({addToPersons}) => {
    const [newName, setNewName] = useState('')
    const [newNum, setNewNum] = useState('')

    const handleNameChange = (event) => {setNewName(event.target.value)}
    const handleNumChange = (event) => setNewNum(event.target.value)

    const addPerson = (event) => {
        event.preventDefault()
        const personObj = {
            name: newName.trim(),
            num: newNum.trim()
        }

        addToPersons(personObj)

        // reset input fields
        setNewName('')
        setNewNum('')
    }

    return (
        <form onSubmit={addPerson}>
            <div>
                name: <input value={newName} placeholder={'add a name ...'}
                             onChange={handleNameChange} required/>
            </div>
            <div>
                number: <input value={newNum} placeholder={'add a phone number ...'}
                             onChange={handleNumChange} required/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}


const App = () => {
    const [persons, setPersons] = useState([])
    const [filterText, setFilterText] = useState('')
    const handleFilterChange = (event) => setFilterText(event.target.value)

    // filtered list of persons to be displayed depending on search filter
    const filteredPersons = persons.filter(person =>
        person.name.toLowerCase().includes(filterText.toLowerCase()))

    // if persons name exists, confirm update (True && update action),
    // else add person object to state piece 'persons'
    // reference: comparing the Obj in JS [https://www.joshbritz.co/posts/why-its-so-hard-to-check-object-equality/]
    const addToPersons = personObj => {
        const personObjFound = persons.find(person =>
            person.name.toLowerCase() === personObj.name.toLowerCase())

        personObjFound ?
            window.confirm(`${personObjFound.name} is already added to the phonebook, 
            replace the old number with a new one?`) &&
            updatePerson(personObjFound.id, personObj) :

            // save new personObj to a backend server and update 'persons' state
            personService
                .create(personObj)
                .then(returnedObj => {
                    setPersons(persons.concat(returnedObj))
                })
    }

    const removeFromPersons = personObj => {
        window.confirm(`Delete ${personObj.name}?`) &&
        personService
            .remove(personObj.id)
            .then(() => {
                setPersons(persons.filter(p => p.id !== personObj.id))
            })
    }

    const updatePerson = (personId, newPersonObj) => {
        personService
            .update(personId, newPersonObj)
            .then(returnedObj => {
                setPersons(persons.map(p => p.id !== personId ? p : returnedObj))
            })
    }

    // effect - fetching data from json file
    useEffect(() => {
        personService
            .getAll()
            .then(data => {setPersons(data)})
    }, [])

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filterText={filterText} handleFilterChange={handleFilterChange}/>
            <h3>add a new</h3>
            <PersonForm addToPersons={addToPersons}/>
            <h3>Numbers</h3>
            <DisplayPersons filteredPersons={filteredPersons}
                            removePerson={removeFromPersons}/>
        </div>
    )
}


export default App;