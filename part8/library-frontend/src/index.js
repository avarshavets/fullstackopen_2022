import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import {
    ApolloClient, ApolloProvider, HttpLink, InMemoryCache, gql
} from '@apollo/client'

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: 'http://localhost:4000',
    })
})

// const query = gql`
// query {
//   allAuthors {
//     name
//     born
//     bookCount
//   }
// }
// `
//
// client.query({ query })
//     .then((response) => {
//         console.log(response.data)
//     })

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
);