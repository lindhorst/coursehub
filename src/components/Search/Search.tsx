import { SyntheticEvent, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';

import { setFilteredCategories } from '../../redux/categoriesSlice';

import { ReactComponent as SearchIcon } from './search.svg';

import styles from './Search.module.scss';

export default function Search() {
	const [showResult, setShowResult] = useState(false);
	const dispatch = useAppDispatch();
	const { filteredCategories } = useAppSelector(
		({ filteredCategories }) => filteredCategories
	);

	const onSubmit = (e: SyntheticEvent) => {
		e.preventDefault();

		const { input } = e.target as HTMLFormElement;

		dispatch(setFilteredCategories(input.value));
	};

	return (
		<form
			tabIndex={0}
			className={styles.wrapper}
			onSubmit={onSubmit}
			onFocus={() => setShowResult(true)}
			onBlur={() => setShowResult(false)}
		>
			<input
				type="text"
				placeholder="Поиск"
				name="input"
				required
				minLength={2}
			/>

			<button>
				<SearchIcon />
			</button>

			{showResult && filteredCategories.length !== 0 && (
				<>
					<hr />

					<ul>
						{filteredCategories.map(({ title, _id }) => (
							<li key={_id}>{title}</li>
						))}
					</ul>
				</>
			)}
		</form>
	);
}
