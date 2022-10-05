import { Fragment, useEffect, useState } from 'react';

import { useAppSelector } from '../../redux/hooks';

import { ReactComponent as CoursesIcon } from './icons/courses.svg';
import { ReactComponent as OthersIcon } from './icons/others.svg';
import { ReactComponent as SchoolIcon } from './icons/school.svg';

import styles from './menu.module.scss';

const firstCategories = [
	{ icon: <CoursesIcon />, text: 'Курсы' },
	{ icon: <SchoolIcon />, text: 'Для школьников' },
	{ icon: <OthersIcon />, text: 'Прочее' }
];

export default function Menu() {
	const { categories } = useAppSelector((state) => state.categories);
	const [categoryId, setCategoryId] = useState(0);

	return (
		<ul className={styles.menu}>
			{firstCategories.map(({ icon, text }, i) => (
				<Fragment key={i}>
					<li
						className={i == categoryId ? styles.active : undefined}
						onClick={() => setCategoryId(i)}
					>
						{icon}
						{text}
					</li>

					{categories.length != 0 && i == categoryId && (
						<ul>
							{categories[categoryId].map((item, i) => (
								<li key={i}>{item._id.secondCategory}</li>
							))}
						</ul>
					)}
				</Fragment>
			))}
		</ul>
	);
}
