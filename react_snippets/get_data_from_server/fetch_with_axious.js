import axios from 'axios'
import { useState, useEffect } from 'react'

// First the body is executed and App component is rendered first time
// useEffect is executed right after rendering:
//  - 1st parameter - effect itselt (function that fetches data in this case)
//  - 2d parameter - specifies how often the effect is run:
//  --> empty array --> runs once after first render
//

const App = () => {
    const [notes, setNotes] = useState([])

    const fetchData = () => {
        console.log('effect')

        const eventHandler = response => {
            console.log('promise fulfilled')
            setNotes(response.data)
        }

        const promise = axios.get('http://localhost:3002/notes')
        promise.then(eventHandler)
    }

    // executing fetchData effect with useEffect()
    useEffect(fetchData, [])
    console.log('render', notes.length, 'notes')


    // ----- a more compact way of definition -----
    useEffect(() => {
      console.log('effect')
      axios
          .get('http://localhost:3002/notes')
          .then(response => {
            console.log('promise fulfilled')
            setNotes(response.data)
          })
    }, [])
    console.log('render', notes.length, 'notes')

    return (
        <>
            <h1>Notes</h1>
        </>
    )
}
export default App;
