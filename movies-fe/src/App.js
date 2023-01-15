import styles from "./App.module.css";
import { Outlet } from "react-router-dom";
import SearchBar from "./SearchBar";
import Sidebar from "./Sidebar";


export default function App() {
	return (
		<>
			<i title="Go to top" onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })} className={`fa fa-arrow-up ${styles.myBtn}`} aria-hidden="true"></i>
			<div className={`${styles.container} ${styles.main}`}>
				<Sidebar />
				<SearchBar />
				<Outlet />
			</div>
		</>
	);
}