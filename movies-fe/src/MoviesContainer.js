import MovieComponent from "./MovieComponent";
import styles from "./MoviesContainer.module.css";

export default function MoviesContainer({ movies, title, isInWatchlistView = false, triggerRefresh }) {

    return (
        <>
            <div className={styles.content}>
                <div className={styles.innerContainer}>
                    <div className={styles.titles}>
                        {title ? <h1>{title}</h1> : null}
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