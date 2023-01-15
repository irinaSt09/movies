import { useState, useEffect } from "react";
import styles from "./App.module.css";
import { gql, useQuery } from '@apollo/client';
import { useNavigate } from "react-router-dom";



export default function App() {

	const GET_POPULAR_MOVIES = gql`
		{
			popularMovies{
				id,
				title,
				vote_average,
				poster_path
			}
		}
	`;

	// 	const GET_MOVIE_BY_ID = gql`
	// 	{
	// 		getMovie(id: ${selectedMovieId}){
	// 		  id,
	// 		  title,
	// 		  poster_path
	// 		  vote_average
	// 		  overview
	// 		  popularity
	// 		  poster_path
	// 		  release_date
	// 		  revenue
	// 		  runtime
	// 		  status
	// 		  tagline
	// 		  title
	// 		  video
	// 		}
	// 	  }
	// `;

	const navigate = useNavigate();

	
	const { loading, error, data } = useQuery(GET_POPULAR_MOVIES);

	// const [genres, setGenres] = useState([movie]);
	const [currentSelectedGenreId, setCurrentSelectedGenreId] = useState(3);
	const [searchText, setSearchText] = useState("");
	const [movies, setMovies] = useState([]);
	const [selectedMovieId, setSelectedMovieId] = useState();
	const [selectedMovie, setSelectedMovie] = useState();

	useEffect(() => {
		if (loading === false && data) {
			setMovies(data.popularMovies);
		}
	}, [loading, data]);

	if (loading) return console.log('Loading...');
	if (error) {
		if(error?.networkError?.response?.status == 401) {
			navigate("/login");
		}
		else {
			console.log(error);
		}
	}

	const genreTopRated = {
		id: 1,
		name: "Top Rated"
	};

	const genrePopularity = {
		id: 2,
		name: "Popularity"
	};

	const genreSomethingElse = {
		id: 3,
		name: "Something Else"
	};

	// ...get more from graphql query



	const genres = [genreTopRated, genrePopularity, genreSomethingElse];
	// setGenres([movie]);

	const handleGenreFilterChange = (event, genreId) => {
		event.preventDefault();
		setCurrentSelectedGenreId(genreId);

		//setGenres[filtered]; //get filtered from graphql or filter on client
	}

	const handleSearchTextChange = (event) => {
		event.preventDefault();
		console.log(event.target.value);
		setSearchText(event.target.value);
		//filter movies by name containing searchText
	}

	const handleMovieClick = (event, movieId) => {
		event.preventDefault();

		console.log("Show movie info test");
		//show movieInfo on screen as a single card
	}

	const pussInBootsMovie = {
		id: 315162,
		genres: null,
		title: "Puss in Boots: The Last Wish",
		production_countries: null,
		rating: "6.9"
	};


	//////////////////// Jquery shit
	//////////////////// Jquery shit
	//////////////////// Jquery shit

	var next = 1;
	var nextTV = 1;

	var posterPaths = "https://image.tmdb.org/t/p/w370_and_h556_bestv2";
	var backgroundPaths = "http://image.tmdb.org/t/p/w1280";
	var url = "https://api.themoviedb.org/3/discover/movie?";
	var key = "&api_key=6b4357c41d9c606e4d7ebe2f4a8850ea";
	var urlTV = "https://api.themoviedb.org/3/discover/tv?";
	var moreTVinfo =
		"https://api.themoviedb.org/3/tv/  +tvshow id+  ?&api_key=6b4357c41d9c606e4d7ebe2f4a8850ea";
	var movieCast = "https://api.themoviedb.org/3/movie/";
	var actorInfo = "https://api.themoviedb.org/3/discover/movie?&with_cast=";
	var imdbLink = "http://www.imdb.com/title/";
	var date = new Date();

	//////////////////// Jquery shit
	//////////////////// Jquery shit
	//////////////////// Jquery shit

	return (
		<>
			<i title="Go to top" onclick="topFunction()" id="myBtn" className="fa fa-arrow-up" aria-hidden="true"></i>
			<div className={`${styles.container} ${styles.main}`}>
				<div className={styles.sidebar}>
					<div className={styles.sidebarContainer}>
						<a
							className={styles.logoLink}
							href="#a"
							onclick="sortMovies('popularity')"
						>
							<img
								src="https://i.imgur.com/AYldSBG.png"
								className={styles.logoImage}
							/>
						</a>
						<h2 className={styles.titleGenre}>Discover</h2>
						{/* <a
							class="category-link current"
							href="#a"
							onclick="sortMovies('popularity')"
						>
							<div class="genre">Popular</div>
						</a> */}
						{
							genres.map((genre, index) => {
								return (
									<a
										key={index}
										className={`${styles.categoryLink} ${genre.id == currentSelectedGenreId && styles.current}`}
										href="#a"
										onClick={e => handleGenreFilterChange(e, genre.id)}
									// onclick="sortMovies('rating')" //genreId
									>
										<div className={styles.genre}>{genre.name}</div>
									</a>
								);
							})
						}
					</div>
				</div>





				<div className={styles.search}>
					<form className={styles.searchForm}><button type="submit" className={styles.searchButton}><i className="fa fa-search"></i></button>
						<input id="search" onChange={e => handleSearchTextChange(e)}
							// onKeyPress="return checkSubmit(event)"
							type="search"
							placeholder="&nbsp;Search for a movie..." className={styles.searchInput} value={searchText} />
					</form>
				</div>




				<div className={styles.content}>
					<div className={styles.innerContainer}>
						<div className={styles.titles}>
							<h1>Popular</h1>
							<h2>movies</h2>
						</div>
						<div className={styles.itemContainer}>
							{
								movies?.map((movie, index) => {
									if (!movie) return;
									return <a key={index} className={`${styles.item} ${styles.link} ${styles.movies} m${index}`} id={movie.id} onClick={e => handleMovieClick(e, movie.id)} href='#' >
										<img src={movie.poster_path || "https://www.lexingtonvenue.com/media/poster-placeholder.jpg"} className={styles.image} />
										<div className={styles.itemInner}>
											<h2 className={styles.itemTitle}>{movie.title}</h2>
											<span className={styles.rating}>
												<i class='fa fa-star' aria-hidden='true'>
												</i>{movie.vote_average || "N/A"}
											</span>
										</div>
									</a>
								})
							}
						</div>
						{/* <div class="load-more"><i class="fa fa-plus-circle more" aria-hidden="true"></i></div> //if there is pagination  */}
					</div>
				</div>

			</div>
		</>
	);
}