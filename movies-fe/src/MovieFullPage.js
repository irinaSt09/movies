import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./MovieFullPage.module.css";

export default function MovieFullPage() {

    const { movieId } = useParams();
    const navigate = useNavigate();

    const GET_MOVIE_BY_ID = gql`
		{
			getMovie(id: ${movieId}){
              adult
              backdrop_path
              belongs_to_collection
              budget
              homepage
              id
              imdb_id
              original_language
              original_title
              overview
              popularity
              poster_path
              release_date
              revenue
              runtime
              status
              tagline
              title
              video
              vote_average
              vote_count
              spoken_languages {
                iso_639_1
                name
              }
              production_countries {
                iso_3166_1
                name
              }
              production_companies {
                id
                logo_path
                name
                origin_country
              }
              genres {
                id
                name
              }
			}
		  }
	`;

    const { loading, error, data } = useQuery(GET_MOVIE_BY_ID);
    const [movie, setMovie] = useState();

    useEffect(() => {
        if (loading === false && data) {
            setMovie(data.getMovie);
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

    if (!movie) {
        return;
    }

    return (
        <>
            <div className={styles.content}>
                <div className={styles.innerContainer}>
                    <div className={`${styles.itemContainer} ${styles.single}`}>
                        <div className={styles.overview}>
                            <div className={styles.movieContainer}>
                                <div className={styles.movieInner}>
                                    <div className={styles.movieContent}>
                                        <div className={styles.moviePoster}>
                                            <img className={styles.movieImg} src={movie.poster_path || "https://www.lexingtonvenue.com/media/poster-placeholder.jpg"} />
                                        </div>
                                        <div className={styles.movieData}>
                                            <div className={styles.movieInfo}>
                                                <div className={styles.movieHead}>
                                                    <h1 className={styles.movieTitle}>{movie.title}</h1>
                                                    <h1 className={styles.movieTagline}>{movie.tagline}</h1>
                                                </div>
                                                <div className={styles.movieSubdata}>
                                                    <div className={styles.movieLeft}>
                                                        <p className={styles.movieStars}><i className="fa fa-star" aria-hidden />&nbsp;{movie.vote_average || "N/A"}</p>
                                                    </div>
                                                    <div className={styles.movieRight}>{movie.releaseDate && `${movie.releaseDate}`}{movie.releaseDate && movie.runtime && " / "}{movie.runtime && `${movie.runtime} min`}</div>
                                                </div>
                                                <h3 className={styles.movieFields}>The Genres</h3>
                                                <div className={styles.movieTags}>
                                                    {
                                                        movie.genres?.map((genre, index) => {
                                                            return (
                                                                <>
                                                                    <Link key={index} to={`/genre/${genre?.id}`} className={styles.movieTaxonomy}>{genre?.name}</Link>
                                                                </>
                                                            );
                                                        })
                                                    }
                                                </div>
                                                <h3 className={styles.movieFields}>The Synopsis</h3>
                                                <p className={styles.movieDescription}>{movie.overview}</p>
                                            </div>
                                            {
                                                movie.budget &&
                                                <h3 className={styles.movieFields}>
                                                    Budget - ${movie.budget?.toLocaleString()}
                                                </h3>
                                            }
                                            {
                                                movie.revenue &&
                                                <h3 className={styles.movieFields}>
                                                    Revenue - ${movie.revenue?.toLocaleString()}
                                                </h3>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}