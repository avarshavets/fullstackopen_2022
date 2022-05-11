// <BrowserRouter> stores the current location in the browser's address bar
// using clean URLs and navigates between pre-defined URLs
// using the browser's built-in history stack (HTML5 history API).
// This means that the routing happens 'internally' w/o actual loading of a new content from the server.
import { Routes, Route, Link, useNavigate, useParams, useMatch } from "react-router-dom"
import { useState } from 'react'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }

  // <Link> is an element that lets the user navigate to another page by clicking or tapping on it.
  // <Navigate> element changes the current location when it is rendered (e.g. conditionally, w/o clicking the links)
  return (
      <div>
          <Link style={padding} to='/'>anecdotes</Link>
          <Link style={padding} to='/create_new'>create new</Link>
          <Link style={padding} to='/about'>about</Link>
      </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote =>
          <li key={anecdote.id} >
              <Link to={`/${anecdote.id}`}>{anecdote.content}</Link>
          </li>)}
    </ul>
  </div>
)

const Anecdote = ({ anecdote }) => (
      <div>
          <h2>Anecdote</h2>
          <div>{anecdote.content}</div>
          <div>{anecdote.author}</div>
          <div>{anecdote.info}</div>
          <div>votes: {anecdote.votes}</div>
      </div>
)


const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
      <p>
          Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

          See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
      </p>
  </div>
)

const CreateNew = ({ addNew }) => {
    const [content, setContent] = useState('')
    const [author, setAuthor] = useState('')
    const [info, setInfo] = useState('')

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        addNew({
            content,
            author,
            info,
            votes: 0
        })
        navigate('/')
    }

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
                    <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
                </div>
                <div>
                    author
                    <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
                </div>
                <div>
                    url for more info
                    <input name='info' value={info} onChange={(e)=> setInfo(e.target.value)} />
                </div>
                <button>create</button>
            </form>
        </div>
    )
}

const Notification = ({message}) => {
    const style = {padding: 3}
    return (
        <>
            {message && <div style={style}>{message}</div>}
        </>)
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`A new anecdote '${anecdote.content}' is successfully created!`)
    setTimeout(() => {setNotification('')}, 3000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  // useMatch works only inside BrowserRouter, thus Router is moved to index.js to wrap around App component
  const match = useMatch('/:id')
  // Note: id is part of the url string --> thus, id is a String type --> convert to Number in filter

  const anecdote = match ? anecdotes.find(a => a.id === Number(match.params.id)) : null

  return (
      <div>
          <h1>Software anecdotes</h1>
          <Menu />

          <Notification message={notification} />

          <Routes>
              <Route path='/:id' element={<Anecdote anecdote={anecdote} />} />
              <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />} />
              <Route path='/create_new' element={<CreateNew addNew={addNew} />} />
              <Route path='/about' element={<About />} />
          </Routes>

          <Footer />
      </div>
  )
}

export default App
