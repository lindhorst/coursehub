import { NavLink } from 'react-router-dom';

import { firstLevel } from '../Menu';

import styles from './ThridLevel.module.scss';

interface Pages {
	alias: string;
	title: string;
	_id: string;
	category: string;
}

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
					to={firstLevel[firstLevelActive]?.path + item.alias}
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
