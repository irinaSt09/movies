import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.css";

export default function Sidebar() {

    const [currentSelectedGenreId, setCurrentSelectedGenreId] = useState();

    const navigate = useNavigate();

    const GET_ALL_GENRES = gql`
    {
        getAllGenres{
          id,
          name
        }
      }
	`;

    const { loading, error, data } = useQuery(GET_ALL_GENRES);
    const [genres, setGenres] = useState();

    const discoverOptions = [
        {
            id: 1,
            name: "Most Popular",
            linkTo: "/discover?sortBy=popularity&orderBy=desc"
        },
        {
            id: 2,
            name: "Latest",
            linkTo: "/discover?sortBy=release_date&orderBy=desc"
        },
        {
            id: 3,
            name: "Best Rating",
            linkTo: "/discover?sortBy=rating&orderBy=desc"
        }
    ];
    
    useEffect(() => {
        if (loading === false && data) {
            setGenres(data.getAllGenres);
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

    if (!genres) {
        return;
    }

    const handleDiscoverOptionClick = (event, option) => {
        event.preventDefault();
        setCurrentSelectedGenreId(option.id);
        navigate(option.linkTo);
    }

    const handleGenreFilterChange = (event, genreId) => {
        event.preventDefault();
        setCurrentSelectedGenreId(genreId);
        navigate(`/genre/${genreId}`);
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
                        discoverOptions.map((option, index) => {
                            return (
                                <a
                                    key={index}
                                    className={`${styles.categoryLink} ${option.id == currentSelectedGenreId && styles.current}`}
                                    onClick={e => handleDiscoverOptionClick(e, option)}
                                >
                                    <div className={styles.genre}>{option.name}</div>
                                </a>
                            );
                        })
                    }
                    <h2 className={styles.titleGenre}>Genres</h2>
                    {
                        genres.map((genre, index) => {
                            return (
                                <a
                                    key={index}
                                    className={`${styles.categoryLink} ${genre.id == currentSelectedGenreId && styles.current}`}
                                    onClick={e => handleGenreFilterChange(e, genre.id)}
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