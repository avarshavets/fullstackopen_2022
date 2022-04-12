import {useState, useEffect} from 'react';
import personService from './services/person_service'


const PersonInfo = ({person, removePerson}) => (
    <p>
        {person.name} {person.num}<span> </span>
        <button onClick={() => {
            removePerson(person)
        }}>
            delete
        </button>
    </p>
)


const DisplayPersons = ({filteredPersons, removePerson}) => (
    <div>
        {filteredPersons.map(item =>
            <PersonInfo key={item.id} person={item} removePerson={removePerson}/>
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

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }
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
    const [notification, setNotification] = useState(null)

    const handleFilterChange = (event) => setFilterText(event.target.value)

    // filtered list of persons to be displayed depending on search filter
    const filteredPersons = persons.filter(person =>
        person.name.toLowerCase().includes(filterText.toLowerCase()))

    const notify = (message, type = 'info') => {
        setNotification({message, type}) //{message: message, type: type}
        setTimeout(() => {
            setNotification(null)
        }, 3000)
    }

    // if persons name exists, confirm update (True && update action),
    // else add person object to state piece 'persons'
    // reference: comparing the Obj in JS [https://www.joshbritz.co/posts/why-its-so-hard-to-check-object-equality/]
    const addToPersons = personObj => {
        // const personObjFound = persons.find(person =>
        //     person.name.toLowerCase() === personObj.name.toLowerCase())
        //
        // if (personObjFound) {
        //     if (window.confirm(`${personObjFound.name} is already added to the phonebook,
        //     replace the old number with a new one?`)) {
        //         updatePerson(personObjFound.id, personObj)
        //         notify(`Updated info of ${personObj.name}`)
        //     }
        // } else {
        //     // save new personObj to a backend server and update 'persons' state
        //     personService
        //         .create(personObj)
        //         .then(returnedObj => {
        //             setPersons(persons.concat(returnedObj))
        //             notify(`Added ${personObj.name}`)
        //         })
        //         .catch(error => {
        //             console.log(error.response.data)
        //             notify(error.response.data.error, 'alert')
        //         })
        // }
        personService
                .create(personObj)
                .then(returnedObj => {
                    setPersons(persons.concat(returnedObj))
                    notify(`Added ${personObj.name}`)
                })
                .catch(error => {
                    console.log(error.response.data)
                    notify(error.response.data.error, 'alert')
                })
    }

    const removeFromPersons = personObj => {
        window.confirm(`Delete ${personObj.name}?`) &&
        personService
            .remove(personObj.id)
            .then(() => {
                setPersons(persons.filter(p => p.id !== personObj.id))
            })
            .catch(error => {
                notify(`Information of ${personObj.name} 
                has been already removed`, 'alert')
            })
    }

    const updatePerson = (personId, newPersonObj) => {
        personService
            .update(personId, newPersonObj)
            .then(returnedObj => {
                setPersons(persons.map(p => p.id !== personId ? p : returnedObj))
            })
            .catch(error => {
                console.log(error.response.data)
                notify(error.response.data, 'alert')
            })
    }

    // effect - fetching data from json file
    useEffect(() => {
        personService
            .getAll()
            .then(data => {
                setPersons(data)
            })
    }, [])

    // notification of success when adding a person
    const Notification = ({notification}) => {
        if (notification === null) {
            return null
        }
        // css properties for successMsg as JS object
        const style = {
            color: notification.type === 'info' ? 'green' : 'red',
            backgroundColor: 'lightgrey',
            fontSize: 16,
            borderStyle: 'solid',
            borderColor: notification.type === 'info' ? 'green' : 'red',
            birderRadius: 5,
            padding: 10,
            marginBottom: 10
        }
        return (
            <div style={style}>{notification.message}</div>
        )
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification notification={notification}/>
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