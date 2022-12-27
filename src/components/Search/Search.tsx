import { SyntheticEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks';

import { setFilteredCategories } from '../../redux/categoriesSlice';

import { ReactComponent as SearchIcon } from './search.svg';

import styles from './Search.module.scss';

export default function Search() {
	const [showResult, setShowResult] = useState(false);
	const [inFocus, setInFocus] = useState(false);
	const [wasOnSubmit, setOnWasSubmit] = useState(false);
	const dispatch = useAppDispatch();
	const { filteredCategories } = useAppSelector(
		({ filteredCategories }) => filteredCategories
	);

	useEffect(() => {
		const mouseup = () => {
			!inFocus && setShowResult(false);
		};

		window.addEventListener('mouseup', mouseup);

		return () => window.removeEventListener('mouseup', mouseup);
	});

	const onSubmit = (e: SyntheticEvent) => {
		e.preventDefault();

		const { input } = e.target as HTMLFormElement;

		dispatch(setFilteredCategories(input.value));
		setOnWasSubmit(true);
	};

	return (
		<form
			tabIndex={-1}
			className={styles.wrapper}
			onSubmit={onSubmit}
			onFocus={() => {
				setShowResult(true);
				setInFocus(true);
			}}
			onBlur={() => {
				!showResult && setShowResult(false);
				setInFocus(false);
			}}
		>
			<input
				type="text"
				placeholder="Поиск"
				name="input"
				required
				minLength={2}
				autoComplete="off"
			/>

			<button>
				<SearchIcon />
			</button>

			{showResult &&
				(filteredCategories.length > 0 ? (
					<>
						<hr />

						<ul>
							{filteredCategories.map(item => (
								<li key={item._id}>
									<Link
										to={item.route + item.alias}
										onMouseDown={() => setShowResult(true)}
										onClick={() => setShowResult(false)}
									>
										{item.title}
									</Link>
								</li>
							))}
						</ul>
					</>
				) : (
					wasOnSubmit && (
						<>
							<hr />

							<p>Совпадений не найдено</p>
						</>
					)
				))}
		</form>
	);
}
