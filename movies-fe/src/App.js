import styles from "./App.module.css";
import { Outlet } from "react-router-dom";
import SearchBar from "./SearchBar";
import Sidebar from "./Sidebar";
import { createContext, useState } from "react";

export const WatchlistContext = createContext();

export default function App() {

	const [selectedWatchlistId, setSelectedWatchlistId] = useState();

	return (
		<>
			<i title="Go to top" onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })} className={`fa fa-arrow-up ${styles.myBtn}`} aria-hidden="true"></i>
			<div className={styles.main}>
				<WatchlistContext.Provider value={selectedWatchlistId}>
					<Sidebar onChangeSelectedWatchlistId={setSelectedWatchlistId} />
					<SearchBar />
					<Outlet />
				</WatchlistContext.Provider>
			</div>
		</>
	);
}