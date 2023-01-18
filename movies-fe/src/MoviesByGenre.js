import { useState, useEffect } from "react";
import { gql, useQuery } from '@apollo/client';
import { useNavigate, useParams } from "react-router-dom";
import MoviesContainer from "./MoviesContainer";

export default function MoviesByGenre() {

    const navigate = useNavigate();

    const { genreId } = useParams("");
    const [movies, setMovies] = useState([]);


    const SEARCH_MOVIES_BY_GENRE = gql`
	{
		discover(sortBy: POPULARITY_DESC, genres: ${genreId}){
		  id,
		  title,
		  voteAverage,
		  posterPath
		}
	}
`;
    const { loading, error, data } = useQuery(SEARCH_MOVIES_BY_GENRE);

    useEffect(() => {
        if (loading === false && data) {
            setMovies(data.discover);
        }
    }, [loading, data]);

    if (loading) return <div>Loading...</div>;
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
            <MoviesContainer movies={movies} />
        </>
    );
}