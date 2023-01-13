import { useState } from "react";

export default function App() {

	const movie = {
		release_date: "01.01.2023",
		revenue: 1500,
		runtime: "2h",
		status: "asdf",
		title: "movie"
	};

	const [genres, setGenres] = useState([movie]);

	setGenres([movie]);

	const sortMovies = (field) => {

	}

	return (
		<>
		<div>AAAAAAA</div>
		{
			genres.map(movie => {
				<div>
					{movie.release_date}
				</div>
			})
		}
		</>
	);

	return (
		<>
			<div class="sidebar-container">
				<a
					class="logo-link"
					href="#"
					onclick="sortMovies('popularity')"
				>
					<img
						src="https://i.imgur.com/AYldSBG.png"
						class="logo-image"
					/>
				</a>
				<h2 class="title-genre">Discover</h2>
				<a
					class="category-link current"
					href="#"
					onclick="sortMovies('popularity')"
				>
					<div class="genre">Popular</div>
				</a>
				<a
					class="category-link"
					href="#"
					onclick="sortMovies('rating')"
				>
					<div class="genre">Top Rated</div>
				</a>
				<a
					class="category-link"
					href="#"
					onclick="sortMovies('grossing')"
				>
					<div class="genre">Grossing</div>
				</a>
				<h2 class="title-genre">Genres</h2>
				<a
					class="category-link"
					href="#"
					onclick="sortMovies('action')"
				>
					<div class="genre">Action</div>
				</a>
				<a
					class="category-link"
					href="#"
					onclick="sortMovies('adventure')"
				>
					<div class="genre">Adventure</div>
				</a>
				<a
					class="category-link"
					href="#"
					onclick="sortMovies('animation')"
				>
					<div class="genre">Animation</div>
				</a>
				<a
					class="category-link"
					href="#"
					onclick="sortMovies('comedy')"
				>
					<div class="genre">Comedy</div>
				</a>
				<a class="category-link" href="#" onclick="sortMovies('crime')">
					<div class="genre">Crime</div>
				</a>
				<a
					class="category-link"
					href="#"
					onclick="sortMovies('documentary')"
				>
					<div class="genre">Documentary</div>
				</a>
				<a class="category-link" href="#" onclick="sortMovies('drama')">
					<div class="genre">Drama</div>
				</a>
				<a
					class="category-link"
					href="#"
					onclick="sortMovies('family')"
				>
					<div class="genre">Family</div>
				</a>
				<a
					class="category-link"
					href="#"
					onclick="sortMovies('fantasy')"
				>
					<div class="genre">Fantasy</div>
				</a>
				<a
					class="category-link"
					href="#"
					onclick="sortMovies('history')"
				>
					<div class="genre">History</div>
				</a>
				<a
					class="category-link"
					href="#"
					onclick="sortMovies('horror')"
				>
					<div class="genre">Horror</div>
				</a>
				<a class="category-link" href="#" onclick="sortMovies('music')">
					<div class="genre">Music</div>
				</a>
				<a
					class="category-link"
					href="#"
					onclick="sortMovies('mystery')"
				>
					<div class="genre">Mystery</div>
				</a>
				<a
					class="category-link"
					href="#"
					onclick="sortMovies('romance')"
				>
					<div class="genre">Romance</div>
				</a>
				<a
					class="category-link"
					href="#"
					onclick="sortMovies('science fiction')"
				>
					<div class="genre">Science Fiction</div>
				</a>
				<a
					class="category-link"
					href="#"
					onclick="sortMovies('tv movie')"
				>
					<div class="genre">TV Movie</div>
				</a>
				<a
					class="category-link"
					href="#"
					onclick="sortMovies('thriller')"
				>
					<div class="genre">Thriller</div>
				</a>
				<a class="category-link" href="#" onclick="sortMovies('war')">
					<div class="genre">War</div>
				</a>
				<a
					class="category-link"
					href="#"
					onclick="sortMovies('western')"
				>
					<div class="genre">Western</div>
				</a>
				<a
					target="_blank"
					rel="noopener noreferrer"
					href="#"
					onclick="window.open('https://ko-fi.com/vincenzopiromalli')"
					class="coffee"
				>
					<img
						src="https://i.imgur.com/WP4kgsA.png"
						alt="Buy me a coffee"
					/>
					<span style="margin-left: 5px;">Buy me a coffee</span>
				</a>
			</div>
		</>
	);
}
//         <div className="App">
//             AAAAAAAAAAAAAA
//             <div class="sidebar-container">
//                 <a
//                     class="logo-link"
//                     href="#"
//                     onclick="sortMovies('popularity')"
//                 >
//                     <img
//                         src="https://i.imgur.com/AYldSBG.png"
//                         class="logo-image"
//                     />
//                 </a>
//                 <h2 class="title-genre">Discover</h2>
//                 <a
//                     class="category-link current"
//                     href="#"
//                     onclick="sortMovies('popularity')"
//                 >
//                     <div class="genre">Popular</div>
//                 </a>
//                 <a
//                     class="category-link"
//                     href="#"
//                     onclick="sortMovies('rating')"
//                 >
//                     <div class="genre">Top Rated</div>
//                 </a>
//                 <a
//                     class="category-link"
//                     href="#"
//                     onclick="sortMovies('grossing')"
//                 >
//                     <div class="genre">Grossing</div>
//                 </a>
//                 <h2 class="title-genre">Genres</h2>
//                 <a
//                     class="category-link"
//                     href="#"
//                     onclick="sortMovies('action')"
//                 >
//                     <div class="genre">Action</div>
//                 </a>
//                 <a
//                     class="category-link"
//                     href="#"
//                     onclick="sortMovies('adventure')"
//                 >
//                     <div class="genre">Adventure</div>
//                 </a>
//                 <a
//                     class="category-link"
//                     href="#"
//                     onclick="sortMovies('animation')"
//                 >
//                     <div class="genre">Animation</div>
//                 </a>
//                 <a
//                     class="category-link"
//                     href="#"
//                     onclick="sortMovies('comedy')"
//                 >
//                     <div class="genre">Comedy</div>
//                 </a>
//                 <a class="category-link" href="#" onclick="sortMovies('crime')">
//                     <div class="genre">Crime</div>
//                 </a>
//                 <a
//                     class="category-link"
//                     href="#"
//                     onclick="sortMovies('documentary')"
//                 >
//                     <div class="genre">Documentary</div>
//                 </a>
//                 <a class="category-link" href="#" onclick="sortMovies('drama')">
//                     <div class="genre">Drama</div>
//                 </a>
//                 <a
//                     class="category-link"
//                     href="#"
//                     onclick="sortMovies('family')"
//                 >
//                     <div class="genre">Family</div>
//                 </a>
//                 <a
//                     class="category-link"
//                     href="#"
//                     onclick="sortMovies('fantasy')"
//                 >
//                     <div class="genre">Fantasy</div>
//                 </a>
//                 <a
//                     class="category-link"
//                     href="#"
//                     onclick="sortMovies('history')"
//                 >
//                     <div class="genre">History</div>
//                 </a>
//                 <a
//                     class="category-link"
//                     href="#"
//                     onclick="sortMovies('horror')"
//                 >
//                     <div class="genre">Horror</div>
//                 </a>
//                 <a class="category-link" href="#" onclick="sortMovies('music')">
//                     <div class="genre">Music</div>
//                 </a>
//                 <a
//                     class="category-link"
//                     href="#"
//                     onclick="sortMovies('mystery')"
//                 >
//                     <div class="genre">Mystery</div>
//                 </a>
//                 <a
//                     class="category-link"
//                     href="#"
//                     onclick="sortMovies('romance')"
//                 >
//                     <div class="genre">Romance</div>
//                 </a>
//                 <a
//                     class="category-link"
//                     href="#"
//                     onclick="sortMovies('science fiction')"
//                 >
//                     <div class="genre">Science Fiction</div>
//                 </a>
//                 <a
//                     class="category-link"
//                     href="#"
//                     onclick="sortMovies('tv movie')"
//                 >
//                     <div class="genre">TV Movie</div>
//                 </a>
//                 <a
//                     class="category-link"
//                     href="#"
//                     onclick="sortMovies('thriller')"
//                 >
//                     <div class="genre">Thriller</div>
//                 </a>
//                 <a class="category-link" href="#" onclick="sortMovies('war')">
//                     <div class="genre">War</div>
//                 </a>
//                 <a
//                     class="category-link"
//                     href="#"
//                     onclick="sortMovies('western')"
//                 >
//                     <div class="genre">Western</div>
//                 </a>
//                 <a
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     href="#"
//                     onclick="window.open('https://ko-fi.com/vincenzopiromalli')"
//                     class="coffee"
//                 >
//                     <img
//                         src="https://i.imgur.com/WP4kgsA.png"
//                         alt="Buy me a coffee"
//                     />
//                     <span style="margin-left: 5px;">Buy me a coffee</span>
//                 </a>
//             </div>
//         </div>
//     );
// }
