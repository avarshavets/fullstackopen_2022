import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'
import { useNavigate } from 'react-router-dom'

const LoginForm = ({ setToken }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [ login ] = useMutation(LOGIN, {
        onError: (error) => {
            console.log(error.graphQLErrors[0].message)
        }
    })

    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()

        const loginResult = await login({ variables: { password, username } })
        if ( loginResult.data ) {
            const token = loginResult.data.login.value
            setToken(token)
            localStorage.setItem('library-user-token', token)
        }
        setUsername('')
        setPassword('')

        navigate('/')
    }

    return (
        <div>
            <h2>login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    username
                    <input
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        type='password'
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm