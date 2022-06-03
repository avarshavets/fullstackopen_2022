import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'
import SetBirthYear from './SetBirthYear'

const Authors = ( { token } ) => {
    const result = useQuery(ALL_AUTHORS)

    if (!result.data) {
        return null
    }
    if (result.loading) {
        return <div>loading...</div>
    }

    const authors = result.data.allAuthors

    return (
        <div>
            <h2>authors</h2>
            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th>born</th>
                    <th>books</th>
                </tr>
                {authors.map((a) => (
                    <tr key={a.id}>
                        <td>{a.name}</td>
                        <td>{a.born}</td>
                        <td>{a.bookCount}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            { token && <SetBirthYear /> }
        </div>
    )
}

export default Authors