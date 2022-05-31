import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_BOOK, ALL_AUTHORS, ALL_BOOKS } from '../queries'

const NewBook = (props) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [published, setPublished] = useState('')
    const [genre, setGenre] = useState('')
    const [genres, setGenres] = useState([])

    // useMutation hook returns an array. First element - mutation function
    // Note: Apollo Client does not automatically update the cache of the app,
    // so it still contains previous state (before the mutation)
    // One of the solutions - use refetchQueries
    // Other solutions: set pollInterval in queries that fetch authors / books
    const [ createBook ] = useMutation(ADD_BOOK, {
        refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
        onError: (error) => {
            console.log('Error: ', error.graphQLErrors[0].message)
        }
    })

    if (!props.show) {
        return null
    }

    const submit = async (event) => {
        event.preventDefault()

        createBook({ variables: { title, author, published: Number(published), genres } })

        setTitle('')
        setPublished('')
        setAuthor('')
        setGenres([])
        setGenre('')
    }

    const addGenre = () => {
        setGenres(genres.concat(genre))
        setGenre('')
    }

    return (
        <div>
            <h2>add a book</h2>
            <form onSubmit={submit}>
                <div>
                    title
                    <input
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author
                    <input
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    published
                    <input
                        type="number"
                        value={published}
                        onChange={({ target }) => setPublished(target.value)}
                    />
                </div>
                <div>
                    <input
                        value={genre}
                        onChange={({ target }) => setGenre(target.value)}
                    />
                    <button onClick={addGenre} type="button">
                        add genre
                    </button>
                </div>
                <div>genres: {genres.join(' ')}</div>
                <button type="submit">create book</button>
            </form>
        </div>
    )
}

export default NewBook