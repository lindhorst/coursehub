import { useState } from 'react';

import { useAppSelector } from '../../hooks';

import { ReactComponent as SortIcon } from './sort.svg';
import styles from './Header.module.scss';

export default function Header() {
	const [active, setActive] = useState(true);
	const { title } = useAppSelector(({ title }) => title);

	return (
		<header className={styles.wrapper}>
			<h1>{title}</h1>

			<span>10</span>

			<div
				className={styles.btn + (active ? ` ${styles.active}` : '')}
				onClick={() => setActive(true)}
			>
				{active && <SortIcon />}
				По рейтингу
			</div>

			<div
				className={styles.btn + (active ? '' : ` ${styles.active}`)}
				onClick={() => setActive(false)}
			>
				{!active && <SortIcon />}
				По цене
			</div>
		</header>
	);
}
