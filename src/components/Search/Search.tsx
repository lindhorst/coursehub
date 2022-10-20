import { ReactComponent as SearchIcon } from './search.svg';

import styles from './Search.module.scss';

export default function Search() {
	return (
		<form className={styles.form}>
			<input type="text" placeholder="Поиск..." />

			<button>
				<SearchIcon />
			</button>
		</form>
	);
}
