import { NavLink } from 'react-router-dom';

import { Pages } from '../../../redux/categoriesSlice';

import { firstLevel } from '../Menu';

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
