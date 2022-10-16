import { Fragment, useEffect, useState } from 'react';

import { ReactComponent as CoursesIcon } from './icons/courses.svg';
import { ReactComponent as OthersIcon } from './icons/others.svg';
import { ReactComponent as SchoolIcon } from './icons/school.svg';

import styles from './menu.module.scss';

const сategories = [
	{ icon: <CoursesIcon />, text: 'Курсы', id: 0 },
	{ icon: <SchoolIcon />, text: 'Для школьников', id: 4 },
	{ icon: <OthersIcon />, text: 'Прочее', id: 1 }
];

interface Subcategories {
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
	const [subcategories, setSubcategories] = useState<{
		[key: number]: Subcategories[];
	}>({
		0: [],
		4: [],
		1: []
	});

	useEffect(() => {
		if (!subcategories[category].length) {
			fetch(import.meta.env.VITE_PUBLIC_DOMAIN + '/api/top-page/find', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ firstCategory: category })
			})
				.then(res => res.json())
				.then(data => {
					setSubcategories(array => {
						array[category] = data;
						return { ...array };
					});
				});
		}
	});

	return (
		<ul className={styles.first}>
			{сategories.map(({ icon, text, id }) => (
				<Fragment key={id}>
					<li
						className={id === category ? styles.active : undefined}
						onClick={() => setCategory(id)}
					>
						{icon}
						{text}
					</li>

					{id === category && (
						<Submenu
							subcategories={subcategories}
							firstCategory={category}
						/>
					)}
				</Fragment>
			))}
		</ul>
	);
}

const Submenu = ({
	firstCategory,
	subcategories
}: {
	firstCategory: number;
	subcategories: {
		[key: number]: Subcategories[];
	};
}) => {
	const [category, setCategory] = useState<null | number>(null);

	return (
		<ul className={styles.second}>
			{subcategories[firstCategory].map((item, i) => (
				<Fragment key={i}>
					<li onClick={() => setCategory(i)}>
						{item._id.secondCategory}
					</li>

					{i === category && (
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
};
