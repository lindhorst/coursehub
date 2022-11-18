import { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import LevelSecond from './LevelSecond/LevelSecond';

import { ReactComponent as CoursesIcon } from './icons/courses.svg';
import { ReactComponent as OtherIcon } from './icons/other.svg';
import { ReactComponent as SchoolIcon } from './icons/school.svg';

import styles from './Menu.module.scss';

const firstCategories = [
	{ icon: <CoursesIcon />, text: 'Курсы', category: 0, path: '/courses' },
	//prettier-ignore
	{ icon: <SchoolIcon />, text: 'Для школьников', category: 4, path: '/school'},
	{ icon: <OtherIcon />, text: 'Прочее', category: 1, path: '/other' }
];

export default function Menu() {
	const [activeCategory, setActiveCategory] = useState<number | null>(null);
	const [secondCategories, setSecondCategories] = useState<{
		[key: number]: [];
	}>({
		0: [],
		4: [],
		1: []
	});
	const { pathname } = useLocation();
	const currentPath = pathname.slice(
		pathname.indexOf('/'),
		pathname.lastIndexOf('/')
	);

	useEffect(() => setActiveCategory(null), [pathname]);

	useEffect(() => {
		if (
			activeCategory !== null &&
			!secondCategories[activeCategory]?.length
		) {
			fetch(import.meta.env.VITE_PUBLIC_DOMAIN + '/api/top-page/find', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ firstCategory: activeCategory })
			})
				.then(res => res.json())
				.then(data => {
					setSecondCategories(array => {
						array[activeCategory] = data;
						return { ...array };
					});
				});
		}
	});

	return (
		<ul className={styles.wrapper}>
			{firstCategories.map(({ category, icon, text, path }, i) => {
				if (activeCategory === null && currentPath === path) {
					setActiveCategory(category);
				}

				return (
					<Fragment key={i}>
						<li
							onClick={() =>
								setActiveCategory(
									category === activeCategory
										? null
										: category
								)
							}
							className={
								styles.item +
								(category === activeCategory ||
								path === currentPath
									? ' active'
									: '')
							}
						>
							{icon}
							{text}
						</li>

						{(category === activeCategory ||
							path === currentPath) && (
							<LevelSecond
								secondCategories={secondCategories}
								firstActiveCategory={category}
							/>
						)}
					</Fragment>
				);
			})}
		</ul>
	);
}
