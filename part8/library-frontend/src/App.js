import { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { useApolloClient, useSubscription } from "@apollo/client";
import Recommendations from "./components/Recommendations";
import {ALL_BOOKS, BOOK_ADDED} from "./queries";

// function that takes care of manipulating cache
export const updateCache = (cache, query, addedBook) => {
    const uniqByTitle = (a) => {
        let seen = new Set()
        return a.filter((item) => {
            let k = item.title
            return seen.has(k) ? false : seen.add(k)
        })
    }
    cache.updateQuery({ query: ALL_BOOKS, variables: {
            genre: null
        }}, ({ allBooks }) => {
        return {
            allBooks: uniqByTitle(allBooks.concat(addedBook)),
        }
    })
}

const App = () => {
    const [token, setToken] = useState(null)
    const client = useApolloClient()
    const navigate = useNavigate()

    useEffect(() => {
        const token = window.localStorage.getItem('library-user-token')
        if (token) {
            setToken(token)
        }
    }, [])

    const handleLogout = () => {
        setToken(null)
        // remove the token from local storage and !! reset the cache !! of the Apollo client
        localStorage.clear()
        client.resetStore()

        // navigate to home page (if logging out while being on add book page)
        navigate('/')
    }

    useSubscription(BOOK_ADDED, {
        onSubscriptionData: ({ subscriptionData, client }) => {
            const addedBook = subscriptionData.data.bookAdded
            window.alert(`${addedBook.title} added`)

            updateCache(client.cache, { query: ALL_BOOKS, variables: { genre: null } }, addedBook)
        }
    })

    return (
        <div>
            <div>
                <Link to={'/'}>
                    <button>authors</button>
                </Link>
                <Link to={'/books'}>
                    <button>books</button>
                </Link>
                { token
                    ?
                    <>
                        <Link to={'/add_book'}>
                            <button>add book</button>
                        </Link>
                        <Link to={'/recommendations'}>
                            <button>recommendations</button>
                        </Link>
                        <button onClick={handleLogout}>logout</button>
                    </>
                    :
                    <Link to={'/login'}>
                        <button>login</button>
                    </Link>
                }
            </div>

            <Routes>
                <Route path='/' element={<Authors token={token}/>} />
                <Route path='/books' element={<Books />} />
                <Route path='/login' element={<LoginForm setToken={setToken}/>} />
                <Route path='/add_book' element={<NewBook />} />
                <Route path='/recommendations' element={<Recommendations />}/>
            </Routes>
        </div>
    )
}

export default App