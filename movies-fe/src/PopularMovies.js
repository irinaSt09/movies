import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MoviesContainer from "./MoviesContainer";

export default function PopularMovies() {

    const navigate = useNavigate();

    const GET_POPULAR_MOVIES = gql`
		{
			popularMovies{
				id,
				title,
				voteAverage,
				posterPath
			}
		}
	`;

    const { loading, error, data } = useQuery(GET_POPULAR_MOVIES);

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        if (loading === false && data) {
            setMovies(data.popularMovies);
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
            <MoviesContainer moviesType={"Popular"} movies={movies} />
        </>
    );
}