import MovieComponent from "./MovieComponent";
import styles from "./MoviesContainer.module.css";

export default function MoviesContainer({ movies, moviesType, isInWatchlistView = false }) {
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
                            movies?.map((movie, index) => {
                                if (!movie) return;
                                return <MovieComponent key={index} props={movie} isInWatchlistView={isInWatchlistView}  />
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    );
}