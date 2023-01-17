import MovieComponent from "./MovieComponent";
import styles from "./MoviesContainer.module.css";

export default function MoviesContainer({ movies, moviesType, isInWatchlistView = false, triggerRefresh }) {

    return (
        <>
            <div className={styles.content}>
                <div className={styles.innerContainer}>
                    <div className={styles.titles}>
                        <h1>{moviesType}</h1>
                        <h2>movies</h2>
                    </div>
                    <div className={styles.itemContainer}>
                        {
                            (isInWatchlistView && (!movies || movies.length == 0)) ?
                                <>
                                    <h1>No movies in this watchlist yet...</h1>
                                </>
                                :
                                (
                                    movies?.map((movie, index) => {
                                        if (!movie) return;
                                        return <MovieComponent key={index} props={movie} isInWatchlistView={isInWatchlistView} triggerRefresh={triggerRefresh} />
                                    })
                                )
                        }

                    </div>
                </div>
            </div>
        </>
    );
}