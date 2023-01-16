import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MoviesContainer from "./MoviesContainer";

export default function Watchlist() {

    const navigate = useNavigate();
    const { watchlistId } = useParams();

    const [watchlist, setWatchlist] = useState();
    const [triggerRefresh, setTriggerRefresh] = useState(false);
    
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://localhost:8080/watchlist", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Basic ${btoa(`${localStorage.getItem("username")}:${localStorage.getItem("password")}`)}`
                }
            });
            const data = await response.json();
            const watchlist = data.find(watchlist => watchlist?.id == watchlistId);
            setWatchlist(watchlist);
        };

        fetchData();
    }, [triggerRefresh]);

    // if (loading) return console.log('Loading...');
    // if (error) {
    //     if (error?.networkError?.response?.status == 401) {
    //         navigate("/login");
    //     }
    //     else {
    //         console.log(error);
    //     }
    // }

    return (
        <>
            <MoviesContainer moviesType={"Popular"} movies={[]} />
        </>
    );
}