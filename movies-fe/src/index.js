import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://localhost:8080/graphql',
    cache: new InMemoryCache(),
});

client
    .query({
        query: gql`
        query a {
            popularMovies{
               id,
            title,
            production_countries {
              iso_3166_1
              name
            }
            }
        }
    `,
    })
    .then(result => console.log(result))
    .catch(err => console.log(err));


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        {/* <ApolloProvider client={client}> */}
            <App />
        {/* </ApolloProvider> */}
    </React.StrictMode>
);