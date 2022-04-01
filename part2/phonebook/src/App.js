import axios from "axios";
import { useState, useEffect } from 'react'


const PersonInfo = ({person}) => (
        <p>{person.name} {person.num}</p>
    )


const DisplayPersons = ({ persons, filterText }) => {
    const filteredPersons = persons.filter(person =>
        person.name.toLowerCase().includes(filterText.toLowerCase()))
    return (
        <div>
            {filteredPersons.map(item =>
                <PersonInfo key={item.name} person={item}/>)}
        </div>
    )
}


const Filter = ({filterText, handleFilterChange}) => (
    <div>
        filter shown with <input value={filterText}
                                 onChange={handleFilterChange}/>
    </div>
)


const PersonForm = ({persons, addToPersons}) => {
    const [newName, setNewName] = useState('')
    const [newNum, setNewNum] = useState('')

    const handleNameChange = (event) => {setNewName(event.target.value)}
    const handleNumChange = (event) => setNewNum(event.target.value)

    const addPerson = (event) => {
        event.preventDefault()
        const personObj = {
            name: newName.trim().toLowerCase(),
            num: newNum.trim().toLowerCase()
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

    // add person object to state piece 'persons' if doesn't exist yet
    // reference: comparing the Obj in JS [https://www.joshbritz.co/posts/why-its-so-hard-to-check-object-equality/]
    const addToPersons = (personObj) => {
        // remember: concat() creates a new array
        persons.map(person =>
            person.name).includes(personObj.name) ?
            alert(`${personObj.name} is already added to the phonebook`) :
            setPersons(persons.concat(personObj))
    }

    // effect - fetching data from json file
    useEffect(() => {
        axios
            .get('http://localhost:3002/persons')
            .then((response) => {
                setPersons(response.data)
            })
    }, [])

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filterText={filterText} handleFilterChange={handleFilterChange}/>
            <h3>add a new</h3>
            <PersonForm persons={persons}
                        addToPersons={addToPersons}/>
            <h3>Numbers</h3>
            <DisplayPersons persons={persons} filterText={filterText}/>
        </div>
    )
}


export default App;