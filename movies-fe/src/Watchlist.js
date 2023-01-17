import { gql, useQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { WatchlistContext } from "./WatchlistContext";
import MoviesContainer from "./MoviesContainer";

export default function Watchlist() {

    const navigate = useNavigate();
    const { watchlistId } = useParams();

    const [watchlist, setWatchlist] = useState({ movies: [] });
    const [isLoading, setIsLoading] = useState(false);

    const state = useContext(WatchlistContext);

    useEffect(() => {
        state.setWatchlistId(watchlistId);
    }, []);

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8080/watchlist", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Basic ${btoa(`${localStorage.getItem("username")}:${localStorage.getItem("password")}`)}`
                    }
                });
                const data = await response.json();
                const watchlist = data.find(watchlist => watchlist?.id == watchlistId);
                if (!watchlist) {
                    alert("This watchlist cannot be accessed");
                }
                setWatchlist(watchlist);
            }
            catch (err) {
                console.log(err);
            }
            finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const GET_MOVIES = gql`
		{
			getMovies(ids: [${watchlist?.movies.join(", ")}]){
				id,
				title,
				voteAverage,
				posterPath
			}
		}
	`;

    const { loading, error, data } = useQuery(GET_MOVIES);

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        if (loading === false && data) {
            setMovies(data.getMovies);
        }
    }, [loading, data, watchlist]);

    if (loading || isLoading) return console.log('Loading...');
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
            <MoviesContainer moviesType={"Popular"} movies={movies} isInWatchlistView={true} />
        </>
    );
}