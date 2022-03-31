// import Course from "./Course";
import axios from 'axios'
import { useState, useEffect } from 'react'

// First the body is executed and App component is rendered first time
// useEffect is executed right after rendering:
//  - 1st parameter - effect itselt (function that fetches data in this case)
//  - 2d parameter - specifies how often the effect is run:
//  --> empty array --> runs once after first render
//

const App = () => {
  // const courses = [
  //   {
  //     name: 'Half Stack application development',
  //     id: 1,
  //     parts: [
  //       {
  //         name: 'Fundamentals of React',
  //         exercises: 10,
  //         id: 1
  //       },
  //       {
  //         name: 'Using props to pass data',
  //         exercises: 7,
  //         id: 2
  //       },
  //       {
  //         name: 'State of a component',
  //         exercises: 14,
  //         id: 3
  //       },
  //       {
  //         name: 'Redux',
  //         exercises: 11,
  //         id: 4
  //       }
  //     ]
  //   },
  //   {
  //     name: 'Node.js',
  //     id: 2,
  //     parts: [
  //       {
  //         name: 'Routing',
  //         exercises: 3,
  //         id: 1
  //       },
  //       {
  //         name: 'Middlewares',
  //         exercises: 7,
  //         id: 2
  //       }
  //     ]
  //   }
  // ]

  const [notes, setNotes] = useState([])
  // const [newNote, setNewNote] = useState('')
  // const [showAll, setShowAll] = useState(true)

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
        {/*{courses.map(courseObj =>*/}
        {/*    <Course key={courseObj.id} course={courseObj}/>*/}
        {/*)}*/}
      </>
  )
}
export default App;
