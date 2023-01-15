import { Link } from "react-router-dom";
import styles from "./MovieComponent.module.css";

export default function MovieComponent({ props: movie }) {
    return (
        <>
            <Link to={`/movie/${movie.id}`} className={`${styles.item} ${styles.link} ${styles.movies}`} id={movie.id} >
                <img src={movie.poster_path || "https://www.lexingtonvenue.com/media/poster-placeholder.jpg"} className={styles.image} />
                <div className={styles.itemInner}>
                    <h2 className={styles.itemTitle}>{movie.title}</h2>
                    <span className={styles.rating}>
                        <i className='fa fa-star' aria-hidden='true'>
                        </i>{movie.vote_average || "N/A"}
                    </span>
                </div>
            </Link>
        </>
    );
}