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
    const [genres, setGenres] = useState([]);
    const username = localStorage.getItem("username");
    const [watchlists, setWatchlists] = useState([]);
    const [triggerRefresh, setTriggerRefresh] = useState(false);

    const createWatchlistButton = {
        name: "Create Watchlist"
    };

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

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://localhost:8080/watchlist", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Basic ${btoa(`${username}:${localStorage.getItem("password")}`)}`
                }
            });
            const data = await response.json();
            setWatchlists(data);
        };

        fetchData();
    }, [triggerRefresh]);

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

    const handleWatchlistClick = (event, watchlistId) => {
        event.preventDefault();
        console.log("open watchlist id " + watchlistId);
    }

    const handleAddWatchlist = (event) => {
        event.preventDefault();
        const watchlistName = document.querySelector("#watchlistName").value;
        if (!watchlistName || watchlistName.length == 0) {
            alert("Watchlist name cannot be empty");
            return;
        }

        fetch("http://localhost:8080/watchlist", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${btoa(`${username}:${localStorage.getItem("password")}`)}`
            },
            body: JSON.stringify({ name: watchlistName })
        }).then(res => {
            console.log(res);
            if (res.status == 200) {
                setTriggerRefresh(!triggerRefresh);
            }
            else if (res.status == 401) {
                navigate("/login");
            }
            else {
                console.log("Error with signup");
            }
        }).catch(err => {
            console.log(err);
        });

        //post creation of new watchlist
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
                    <p>Hi{username && `, ${username}`}!</p>
                    <h2 className={styles.titleGenre}>Here are your watchlists</h2>
                    {
                        watchlists?.map((watchlist, index) => {
                            return (
                                <a
                                    key={index}
                                    className={`${styles.categoryLink}`}
                                    onClick={e => handleWatchlistClick(e, watchlist.id)}
                                >
                                    <div className={styles.genre}>{watchlist.name}</div>
                                </a>
                            );
                        })
                    }
                    <form className={styles.addWatchlistForm} onSubmit={e => handleAddWatchlist(e)}>
                        <button type="submit" className={styles.addWatchlistButton}><i className="fa fa-plus"></i></button>
                        <input id="watchlistName" placeholder="&nbsp;Add a watchlist..." className={styles.addWatchlistInput} />
                    </form>
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