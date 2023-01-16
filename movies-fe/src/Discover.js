import { useState, useEffect } from "react";
import { gql, useQuery } from '@apollo/client';
import { useLocation, useNavigate } from "react-router-dom";
import MoviesContainer from "./MoviesContainer";

export default function Discover() {

    const navigate = useNavigate();
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    
    let sortBy = searchParams.get("sortBy");
    let orderBy = searchParams.get("orderBy");
    

    if(sortBy != "popularity" && sortBy != "release_date" && sortBy != "rating") {
        sortBy = "popularity";
    }

    if(orderBy != "asc" && orderBy != "desc") {
        orderBy = "desc";
    }

    sortBy = sortBy.toUpperCase();
    orderBy = orderBy.toUpperCase();

    const [movies, setMovies] = useState([]);

    const DISCOVER = gql`
	{
		discover(sortBy: ${sortBy}_${orderBy}){
		  id,
		  title,
		  voteAverage,
		  posterPath
		}
	}
`;
    const { loading, error, data } = useQuery(DISCOVER);

    useEffect(() => {
        if (loading === false && data) {
            setMovies(data.discover);
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