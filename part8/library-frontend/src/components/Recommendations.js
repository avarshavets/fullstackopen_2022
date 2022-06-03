import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Recommendations = () => {
    const resultMe = useQuery(ME)
    const myGenre = resultMe.data ? resultMe.data.me.favouriteGenre : null
    const resultBooks = useQuery(ALL_BOOKS, {
        variables: { genre: myGenre }
    })

    if (!(resultMe.data && resultBooks.data)) {
        return null
    }

    const books = resultBooks.data.allBooks


    return (
        <div>
            <h2>recommendations</h2>
            <div>
                books in <b>{myGenre} genre</b>
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
        </div>
    )
}

export default Recommendations