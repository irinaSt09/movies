import { useState } from "react";
import "./App.css";
import { gql, useQuery } from '@apollo/client';



export default function App() {

	// 	const GET_POPULAR_MOVIES = gql`
	// 	query a {
	// 		popularMovies{
	// 		   id,
	// 		title,
	// 		production_countries {
	// 		  iso_3166_1
	// 		  name
	// 		}
	// 		}
	// 	}
	// `;

	// const { loading, error, data } = useQuery(GET_POPULAR_MOVIES);

	// if (loading) return <p>Loading...</p>;
	// if (error) return <p>Error : {error.message}</p>;
	// if(data) {
	// 	console.log(data);
	// 	return <p>DATAAAA LOOOK AT THE CONSOLE</p>;
	// }


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


	// const [genres, setGenres] = useState([movie]);
	const [currentSelectedGenreId, setCurrentSelectedGenreId] = useState(3);
	const [searchText, setSearchText] = useState("");

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

	const movies = [pussInBootsMovie]; //move to state, get movies with graphql query



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
			<i title="Go to top" onclick="topFunction()" id="myBtn" class="fa fa-arrow-up" aria-hidden="true"></i>
			<div class="container main">
				<div class="sidebar">
					<div class="sidebar-container">
						<a
							class="logo-link"
							href="#a"
							onclick="sortMovies('popularity')"
						>
							<img
								src="https://i.imgur.com/AYldSBG.png"
								class="logo-image"
							/>
						</a>
						<h2 class="title-genre">Discover</h2>
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
										className={`category-link ${genre.id == currentSelectedGenreId && "current"}`}
										href="#a"
										onClick={e => handleGenreFilterChange(e, genre.id)}
									// onclick="sortMovies('rating')" //genreId
									>
										<div class="genre">{genre.name}</div>
									</a>
								);
							})
						}
					</div>
				</div>





				<div class="search">
					<form class="search-form"><button type="submit" class="search-button"><i class="fa fa-search"></i></button>
						<input id="search" onChange={e => handleSearchTextChange(e)}
							// onKeyPress="return checkSubmit(event)"
							type="search"
							placeholder="&nbsp;Search for a movie..." class="search-input" value={searchText} />
					</form>
				</div>




				<div class="content">
					<div class="inner-container">
						<div class="titles">
							<h1>Popular</h1>
							<h2>movies</h2>
						</div>
						<div class="item-container">
							{
								movies.map((movie, index) => {
									return <a key={index} className={`item link movies m${index}`} id={movie.id} onClick={e => handleMovieClick(e, movie.id)} href='#' >
										<img src={movie.posterUrl || "https://variety.com/wp-content/uploads/2021/07/Rick-Astley-Never-Gonna-Give-You-Up.png?w=681&h=383&crop=1"} class='image' />
										<div class='item-inner'>
											<h2 class='item-title'>{movie.title}</h2>
											<span class='rating'>
												<i class='fa fa-star' aria-hidden='true'>
												</i>{movie.rating || "N/A"}
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