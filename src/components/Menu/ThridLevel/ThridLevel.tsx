import { NavLink } from 'react-router-dom';

import { routes } from '../../../helpers';

import type { Pages } from '../../../interfaces';

import styles from './ThridLevel.module.scss';

export const ThridLevel = ({
	pages,
	firstLevelActive
}: {
	pages: Pages[];
	firstLevelActive: number;
}) => (
	<ul className={styles.wrapper}>
		{pages.map(item => (
			<li key={item._id}>
				<NavLink
					to={routes[firstLevelActive] + item.alias}
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
