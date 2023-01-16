import { useState, useEffect } from "react";
import { gql, useQuery } from '@apollo/client';
import { useNavigate, useParams } from "react-router-dom";
import MoviesContainer from "./MoviesContainer";

export default function SearchResults() {

    const navigate = useNavigate();

    const { searchText } = useParams();
    const [movies, setMovies] = useState([]);


    const SEARCH_MOVIES_BY_TITLE = gql`
	{
		searchMoviesByTitle(title: "${searchText || " "}"){
		  id,
		  title,
		  voteAverage,
		  posterPath
		}
	}
`;
    const { loading, error, data } = useQuery(SEARCH_MOVIES_BY_TITLE);

    useEffect(() => {
        if (loading === false && data) {
            setMovies(data.searchMoviesByTitle);
        }
    }, [loading, data]);

    if (loading) return console.log('Loading...');
    if (error) {
        if (error?.networkError?.response?.status == 401) {
            navigate("/login");
        }
        else {
            console.log(error);
        }
    }

    return (
        <>
            <MoviesContainer moviesType={"Popular"} movies={movies} />
        </>
    );
}