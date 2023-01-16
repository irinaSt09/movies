import { Link } from "react-router-dom";
import styles from "./MovieComponent.module.css";

export default function MovieComponent({ props: movie }) {
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
                </div>
            </Link>
        </>
    );
}