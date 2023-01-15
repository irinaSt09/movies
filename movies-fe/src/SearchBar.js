import { useNavigate } from "react-router-dom";
import styles from "./SearchBar.module.css";

export default function SearchBar() {

    const navigate = useNavigate();
    
    const handleSearchSubmit = (event) => {
		event.preventDefault();
		navigate(`/search/${document.querySelector("#search").value}`);
	}
    
    return (
        <>
            <div className={styles.search}>
                <form className={styles.searchForm} onSubmit={(e) => handleSearchSubmit(e)}><button type="submit" className={styles.searchButton}><i className="fa fa-search"></i></button>
                    <input id="search"
                        type="search"
                        placeholder="&nbsp;Search for a movie..." className={styles.searchInput} />
                </form>
            </div>
        </>
    );
}