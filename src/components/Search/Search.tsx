import { SyntheticEvent } from 'react';

import { useAppDispatch } from '../../redux/hooks';
import { setFilteredCategories } from '../../redux/categoriesSlice';

import { ReactComponent as SearchIcon } from './search.svg';

import styles from './Search.module.scss';

export default function Search() {
	const dispatch = useAppDispatch();

	const onSubmit = (e: SyntheticEvent) => {
		e.preventDefault();

		const { input } = e.target as HTMLFormElement;

		dispatch(setFilteredCategories(input.value));
	};

	return (
		<form className={styles.form} onSubmit={onSubmit}>
			<input type="text" placeholder="Поиск категорий" name="input" />

			<button>
				<SearchIcon />
			</button>
		</form>
	);
}
