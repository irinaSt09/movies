import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { WatchlistContext } from "./WatchlistContext";
import styles from "./MovieComponent.module.css";

export default function MovieComponent({ props: movie, isInWatchlistView, triggerRefresh }) {

    const context = useContext(WatchlistContext);
    const selectedWatchlistId = context.watchlistId;

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleAddToWatchlistClick = (event, movieId) => {
        event.preventDefault();
        if (!selectedWatchlistId) {
            alert("No watchlist is selected.");
            return;
        }

        if (isLoading) {
            return;
        }

        setIsLoading(true);
        fetch(`http://localhost:8080/watchlist/${selectedWatchlistId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${btoa(`${localStorage.getItem("username")}:${localStorage.getItem("password")}`)}`
            },
            body: JSON.stringify({movie_id: movieId})
        }).then(res => {
            console.log(res);
            setIsLoading(false);
        }).catch(err => console.log(err));
    }

    const handleRemoveFromWatchlistClick = (event, movieId) => {
        event.preventDefault();
        if (!selectedWatchlistId) {
            alert("No watchlist is selected.");
            return;
        }

        if (isLoading) {
            return;
        }

        setIsLoading(true);
        fetch(`http://localhost:8080/watchlist/${selectedWatchlistId}/${movieId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${btoa(`${localStorage.getItem("username")}:${localStorage.getItem("password")}`)}`
            },
        }).then(res => {
            console.log(res);
            navigate(0);
        }).catch(err => console.log(err))
        .finally(() => setIsLoading(false));
    }


    return (
        <>
            <Link to={`/movie/${movie.id}`} className={`${styles.item} ${styles.link} ${styles.movies}`} id={movie.id} >
                <img src={(movie.posterPath && `https://image.tmdb.org/t/p/w370_and_h556_bestv2/${movie.posterPath}`) || "https://www.lexingtonvenue.com/media/poster-placeholder.jpg"} className={styles.image} />
                <div className={styles.itemInner}>
                    <h2 className={styles.itemTitle}>{movie.title}</h2>
                    <span className={styles.rating}>
                        <i className='fa fa-star' aria-hidden='true'>
                        </i>{movie.voteAverage || "N/A"}
                    </span>
                    {isInWatchlistView ?
                        <span className={`${styles.removeFromWatchlist}`} onClick={e => handleRemoveFromWatchlistClick(e, movie.id)}>
                            <i className={isLoading ? "fas fa-spinner" : "fas fa-times-circle"}></i>
                        </span>
                        :
                        <span className={`${styles.addToWatchlist}`} onClick={e => handleAddToWatchlistClick(e, movie.id)}>
                            <i className={isLoading ? "fas fa-spinner" : "fa fa-circle-plus"}></i>
                        </span>
                    }
                </div>
            </Link>
        </>
    );
}