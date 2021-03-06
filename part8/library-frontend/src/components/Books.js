import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_GENRES } from '../queries'
import { useState } from 'react'
import BookFilter from './BookFilter'

const Books = () => {
    const [ genreFilter, setGenreFilter ] = useState(null)
    const resultGenres = useQuery(ALL_GENRES)
    const resultBooks = useQuery(ALL_BOOKS, {
        variables: { genre: genreFilter }
    })
    if (!(resultGenres.data && resultBooks.data)) {
        return null
    }

    const genres = resultGenres.data.allGenres
    const books = resultBooks.data.allBooks

    return (
        <div>
            <h2>books</h2>
            <div>
                in { genreFilter ? <b>{genreFilter} genre</b> : <b>all genres</b> }
            </div>
            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th>author</th>
                    <th>published</th>
                </tr>
                {books.map((a) => (
                    <tr key={a.id}>
                        <td>{a.title}</td>
                        <td>{a.author.name}</td>
                        <td>{a.published}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <BookFilter genres={genres} setGenreFilter={setGenreFilter} />
        </div>
    )
}

export default Books