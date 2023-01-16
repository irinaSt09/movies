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
              backdropPath
              belongsToCollection
              budget
              homepage
              id
              imdbId
              originalLanguage
              originalTitle
              overview
              popularity
              posterPath
              releaseDate
              revenue
              runtime
              status
              tagline
              title
              video
              voteAverage
              voteCount
              spokenLanguages {
                isoCode
                name
              }
              productionCountries {
                isoCode
                name
              }
              productionCompanies {
                id
                logoPath
                name
                originCountry
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
                                            <img className={styles.movieImg} src={(movie.posterPath && `https://image.tmdb.org/t/p/w370_and_h556_bestv2/${movie.posterPath}`) || "https://www.lexingtonvenue.com/media/poster-placeholder.jpg"} />
                                        </div>
                                        <div className={styles.movieData}>
                                            <div className={styles.movieInfo}>
                                                <div className={styles.movieHead}>
                                                    <h1 className={styles.movieTitle}>{movie.title}</h1>
                                                    <h1 className={styles.movieTagline}>{movie.tagline}</h1>
                                                </div>
                                                <div className={styles.movieSubdata}>
                                                    <div className={styles.movieLeft}>
                                                        <p className={styles.movieStars}><i className="fa fa-star" aria-hidden />&nbsp;{movie.voteAverage || "N/A"}</p>
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