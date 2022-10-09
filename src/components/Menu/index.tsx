import { Fragment, useEffect, useState } from 'react';

import { ReactComponent as CoursesIcon } from './icons/courses.svg';
import { ReactComponent as OthersIcon } from './icons/others.svg';
import { ReactComponent as SchoolIcon } from './icons/school.svg';

import styles from './menu.module.scss';

const firstLevel = [
	{ icon: <CoursesIcon />, text: 'Курсы', id: 0 },
	{ icon: <SchoolIcon />, text: 'Для школьников', id: 4 },
	{ icon: <OthersIcon />, text: 'Прочее', id: 1 }
];

interface SecondLevel {
	_id: { secondCategory: string };
	pages: {
		alias: string;
		title: string;
		_id: string;
		category: string;
	}[];
}

export default function Menu() {
	const [category, setCategory] = useState(0);
	const [secondCategory, setSecondCategory] = useState<null | number>(null);
	const [secondLevel, setSecondLevel] = useState<{
		[key: number]: SecondLevel[];
	}>({
		0: [],
		4: [],
		1: []
	});

	useEffect(() => {
		if (!secondLevel[category].length) {
			fetch(import.meta.env.VITE_PUBLIC_DOMAIN + '/api/top-page/find', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ firstCategory: category })
			})
				.then(res => res.json())
				.then(data => {
					setSecondLevel(item => {
						item[category] = data;
						return { ...item };
					});
				});
		}
	});

	useEffect(() => {
		setSecondCategory(null);
	}, [category]);

	const buildFirstLevel = () => (
		<ul className={styles.first}>
			{firstLevel.map(({ icon, text, id }) => (
				<Fragment key={id}>
					<li
						className={id === category ? styles.active : undefined}
						onClick={() => setCategory(id)}
					>
						{icon}
						{text}
					</li>

					{id === category && buildSecondLevel()}
				</Fragment>
			))}
		</ul>
	);

	const buildSecondLevel = () => (
		<ul className={styles.second}>
			{secondLevel[category].map((item, i) => (
				<Fragment key={i}>
					<li onClick={() => setSecondCategory(i)}>
						{item._id.secondCategory}
					</li>

					{i === secondCategory && (
						<ul className={styles.thrid}>
							{item.pages.map(item => (
								<li key={item._id}>{item.category}</li>
							))}
						</ul>
					)}
				</Fragment>
			))}
		</ul>
	);

	return buildFirstLevel();
}
