import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { setContext } from '@apollo/client/link/context';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import ErrorPage from './ErrorPage';
import LoginPage from './LoginPage';

const httpLink = createHttpLink({
    uri: 'http://localhost:8080/graphql',
});

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: (username && password) ? `Basic ${btoa(`${username}:${password}`)}` : "",
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />
    },
    {
        path: "/login",
        element: <LoginPage />,
        errorElement: <ErrorPage />
    },
    {
        path: "*",
        element: <ErrorPage />,
        errorElement: <ErrorPage />
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <RouterProvider router={router} />
        </ApolloProvider>
    </React.StrictMode>
);