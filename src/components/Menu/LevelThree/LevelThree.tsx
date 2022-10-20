import { NavLink } from 'react-router-dom';

import styles from './LevelThree.module.scss';

import { Pages } from '../LevelSecond/LevelSecond';

const firstCategoriesPaths: { [key: number]: string } = {
	0: '/courses',
	4: '/school',
	1: '/other'
};

export default function ThridLevel({
	pages,
	firstActiveCategory
}: {
	pages: Pages[];
	firstActiveCategory: number;
}) {
	return (
		<ul className={styles.wrapper}>
			{pages.map(item => (
				<li key={item._id}>
					<NavLink
						to={
							firstCategoriesPaths[firstActiveCategory] +
							`/${item.alias}`
						}
						className={({ isActive }) =>
							isActive ? 'active' : undefined
						}
					>
						{item.category}
					</NavLink>
				</li>
			))}
		</ul>
	);
}
