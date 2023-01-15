import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function MovieFullPage() {

    const { movieId } = useParams();
    const navigate = useNavigate();

    const GET_MOVIE_BY_ID = gql`
		{
			getMovie(id: ${movieId}){
			  id,
			  title,
			  poster_path
			  vote_average
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
			}
		  }
	`;

    const { loading, error, data } = useQuery(GET_MOVIE_BY_ID);
    const [movie, setMovie] = useState();

    useEffect(() => {
        if (loading === false && data) {
            setMovie(data.popularMovies);
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

    console.log(movie);

    return (
        <>
            {/* <div className={styles.content}>
                <div className={styles.innerContainer}>
                    <div className={`${styles.itemContainer} ${styles.single}`}>
                        <div className={styles.overview}>
                            <div className={styles.movieContainer}>
                                <div className={styles.movieInner}>
                                    <div className={styles.movieContent}>
                                        <div className={styles.moviePoster}>
                                            <img class={styles.movieImg} src="https://image.tmdb.org/t/p/w370_and_h556_bestv2/1NqwE6LP9IEdOZ57NCT51ftHtWT.jpg" />
                                        </div>
                                        <div className={styles.movieData}>
                                            <div className={styles.movieInfo}>
                                                <h3 className={styles.movieFields}>
                                                    The Actors
                                                </h3>
                                                <div className={styles.movieTags}>
                                                    <a className={styles.movieTaxonomy}>Antonio Banderas</a>
                                                    <a className={styles.movieTaxonomy}>Antonio Banderas</a>
                                                    <a className={styles.movieTaxonomy}>Antonio Banderas</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        movies?.map((movie, index) => {
                            if (!movie) return;
                            return <MovieComponent key={index} props={movie} />
                        })
                    }
                </div>
            </div> */}
        </>
    );
}