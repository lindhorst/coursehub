import { ReactComponent as SearchIcon } from './search.svg';
import styles from './search.module.scss';

export default function Search() {
	return (
		<form className={styles.search}>
			<input type="text" placeholder="Поиск..." />

			<button>
				<SearchIcon />
			</button>
		</form>
	);
}
