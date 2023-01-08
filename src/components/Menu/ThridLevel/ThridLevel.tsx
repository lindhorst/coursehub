import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';

import type { Pages } from '../../../interfaces';
import { setTitle } from '../../../redux/couesesSlice';

import styles from './ThridLevel.module.scss';

export const ThridLevel = ({
	category,
	parentActive
}: {
	category: { pages: Pages[]; _id: { secondCategory: string } };
	parentActive: number;
}) => {
	const dispath = useDispatch();
	const route = useLocation().pathname.slice(1);

	useEffect(() => {
		category.pages.forEach(page => {
			if (route === page.alias) {
				dispath(setTitle(page.title));
			}
		});
	});

	return (
		<ul className={styles.wrapper}>
			{category.pages.map(page => (
				<li key={page._id}>
					<NavLink
						to={`${page.alias}?category=${category._id.secondCategory}&parentId=${parentActive}`}
						className={({ isActive }) =>
							isActive ? 'active' : undefined
						}
					>
						{page.category}
					</NavLink>
				</li>
			))}
		</ul>
	);
};
