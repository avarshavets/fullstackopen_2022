// <BrowserRouter> stores the current location in the browser's address bar
// using clean URLs and navigates between pre-defined URLs
// using the browser's built-in history stack (HTML5 history API).
// This means that the routing happens 'internally' w/o actual loading of a new content from the server.

// Routing, or the conditional rendering of components based on the url in the browser,
// is used by placing components as children of the Router component (inside Router tags).

// <Link> is an element that lets the user navigate to another page by clicking or tapping on it.
// <Navigate> element changes the current location when it is rendered (e.g. conditionally, w/o clicking the links)

import ReactDOM from 'react-dom/client'
import { useState } from 'react'

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate,
    useParams,
    useNavigate,
    useMatch
} from "react-router-dom"


const Home = () => (
    <div>
        <h2>Notes app</h2>
        <p>This is our notes app.</p>
    </div>
)

// Note view when clicked on a note in a note list
const Note = ({ note }) => {
    return (
        <div>
            <h2>{note.content}</h2>
            <div>{note.user}</div>
            <div><strong>{note.important ? 'important' : ''}</strong></div>
        </div>
    )
}

// Parameterized route:
// click on a note and navigate to the note view with url '.../notes/id'
const Notes = ({ notes }) => (
    <div>
        <h2>Notes</h2>
        <ul>
            {notes.map(note =>
                <li key={note.id}>
                    <Link to={`/notes/${note.id}`}>{note.content}</Link>
                </li>
            )}
        </ul>
    </div>
)

const Users = () => (
    <div>
        <h2>Notes app</h2>
        <ul>
            <li>Matti Smith</li>
            <li>Juha Anderson</li>
            <li>Arto Lee</li>
        </ul>
    </div>
)

const Login = (props) => {
    const navigate = useNavigate()

    // With user login, we call navigate('/')
    // that causes the browser's url to change to /
    // and the application renders the corresponding component Home.
    const onSubmit = (event) => {
        event.preventDefault()
        props.onLogin('matti')
        navigate('/')
    }

    return (
        <div>
            <h2>login</h2>
            <form onSubmit={onSubmit}>
                <div>username: <input /></div>
                <div>password: <input type='password' /></div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

const App = () => {
    const [notes, setNotes] = useState([
        {
            id: 1,
            content: 'HTML is easy',
            important: true,
            user: 'Matti Smith'
        },
        {
            id: 2,
            content: 'Browser can execute only JavaScript',
            important: false,
            user: 'Matti Smith'
        },
        {
            id: 3,
            content: 'Most important methods of HTTP-protocol are GET and POST',
            important: true,
            user: 'Arto Lee'
        }
    ])

    const [user, setUser] = useState(null)

    // Note:
    // It is not possible to use the useMatch hook in the component
    // which defines the routed part of the application.
    // Thus, Router is moved up to wrap around App component.
    const match = useMatch('/notes/:id')

    // If the url matches /notes/:id, the match variable will contain an object.
    // From the returned object we can access the parameterized part of the path (:id),
    // and we can then fetch the correct note to display and pass it to Note component.
    const note = match ? notes.find(note => note.id === Number(match.params.id)) : null


    const login = (user) => {
        setUser(user)
    }

    const padding = {
        padding: 5
    }

    return (
        <div>
            <div>
                <Link style={padding} to="/">home</Link>
                <Link style={padding} to="/notes">notes</Link>
                <Link style={padding} to="/users">users</Link>
                {user
                    ? <em>{user} logged in</em>
                    : <Link style={padding} to="/login">login</Link>
                }
            </div>
            <Routes>
                <Route path="/notes/:id" element={<Note note={note} />} />
                <Route path="/notes" element={<Notes notes={notes} />} />
                {/* If a user isn't logged in, the Users component is not rendered.
                Instead, the user is redirected to the login view with Navigate */}
                <Route path="/users" element={user ? <Users /> : <Navigate replace to="/login" />} />
                <Route path="/login" element={<Login onLogin={login} />} />
                <Route path="/" element={<Home />} />
            </Routes>
            <div>
                <br />
                <em>Note app, Department of Computer Science 2022</em>
            </div>
        </div>
    )
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <Router>
        <App />
    </Router>
)