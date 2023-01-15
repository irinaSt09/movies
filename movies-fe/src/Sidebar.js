import { useState } from "react";
import styles from "./Sidebar.module.css";

export default function Sidebar() {

    // const [genres, setGenres] = useState([movie]); //gql query
    const [currentSelectedGenreId, setCurrentSelectedGenreId] = useState(3);

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

    const handleGenreFilterChange = (event, genreId) => {
        event.preventDefault();
        setCurrentSelectedGenreId(genreId);

        //setMovies[filteredbyGenre]; //get filtered from graphql or filter on client
    }

    return (
        <>
            <div className={styles.sidebar}>
                <div className={styles.sidebarContainer}>
                    <span
                        className={styles.logoLink}
                    >
                        <img
                            src="https://i.imgur.com/AYldSBG.png"
                            className={styles.logoImage}
                        />
                    </span>
                    <h2 className={styles.titleGenre}>Discover</h2>
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
        </>
    );
}