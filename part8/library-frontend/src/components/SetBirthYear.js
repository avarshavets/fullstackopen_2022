import { useState } from 'react'
import {ALL_AUTHORS, EDIT_AUTHOR} from '../queries'
import {useMutation, useQuery} from '@apollo/client'

const SetBirthYear = () => {
    const [name, setName] = useState('')
    const [yearBorn, setYearBorn] = useState('')

    const resultAuthors = useQuery(ALL_AUTHORS)

    const [ updateAuthor, resultUpdateAuthor ] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [{ query: ALL_AUTHORS }],
        onError: (error) => {
            console.log(error.graphQLErrors)
        }
    })

    // if (resultUpdateAuthor.data && resultUpdateAuthor.data.editAuthor === null) {
    //     console.log('author not found!')
    // }

    const handleSubmit = (e) => {
        e.preventDefault()

        updateAuthor({ variables: { name, setBornTo: Number(yearBorn) } })

        setName('')
        setYearBorn('')

    }

    if (!resultAuthors.data.allAuthors){
        return null
    }

    const authors = resultAuthors.data.allAuthors

    return (
        <div>
            <h3>set author's birth year</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    name
                    <select
                        value={name}
                        onChange={({ target }) => setName(target.value)}>
                        {authors.map(author =>
                            <option key={author.id}
                                    value={author.name}>
                                {author.name}
                            </option>
                        )}
                    </select>
                </div>
                <div>
                    born
                    <input
                        type='number'
                        value={yearBorn}
                        onChange={({ target }) => setYearBorn(target.value)}
                    />
                </div>
                <button type='submit'>update author</button>
            </form>
        </div>
    )
}

export default SetBirthYear
