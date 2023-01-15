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
import SearchResults from './SearchResults';
import MovieFullPage from './MovieFullPage';
import PopularMovies from './PopularMovies';
import MoviesByGenre from './MoviesByGenre';
import Discover from './Discover';


const httpLink = createHttpLink({
    uri: 'http://localhost:8080/graphql',
});

const authLink = setContext((_, { headers }) => {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
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
        children: [
            {
                path: "/",
                element: <PopularMovies />,
                errorElement: <ErrorPage />
            },
            {
                path: "/search/:searchText",
                element: <SearchResults />,
                errorElement: <ErrorPage />
            },
            {
                path: "/movie/:movieId",
                element: <MovieFullPage />,
                errorElement: <ErrorPage />
            },
            {
                path: "/genre/:genreId",
                element: <MoviesByGenre />,
                errorElement: <ErrorPage />
            },
            {
                path: "/discover",
                element: <Discover />,
                errorElement: <ErrorPage />
            }
        ],
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