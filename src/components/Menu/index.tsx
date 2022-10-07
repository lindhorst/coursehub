import { Fragment, useState } from 'react';

import { useAppSelector } from '../../redux/hooks';

import { ReactComponent as CoursesIcon } from './icons/courses.svg';
import { ReactComponent as OthersIcon } from './icons/others.svg';
import { ReactComponent as SchoolIcon } from './icons/school.svg';

import styles from './menu.module.scss';

const firstLevel = [
	{ icon: <CoursesIcon />, text: 'Курсы' },
	{ icon: <SchoolIcon />, text: 'Для школьников' },
	{ icon: <OthersIcon />, text: 'Прочее' }
];

export default function Menu() {
	const { categories: secondLevel } = useAppSelector(
		(state) => state.categories
	);
	const [category, setCategory] = useState(0);
	const [secondCategory, setSecondCategory] = useState<null | number>(null);

	const buildFirstLevel = () => (
		<ul className={styles.first}>
			{firstLevel.map(({ icon, text }, i) => (
				<Fragment key={i}>
					<li
						className={i === category ? styles.active : undefined}
						onClick={() => {
							setCategory(i);
							setSecondCategory(null);
						}}
					>
						{icon}
						{text}
					</li>

					{secondLevel.length !== 0 &&
						i === category &&
						buildSecondLevel()}
				</Fragment>
			))}
		</ul>
	);

	const buildSecondLevel = () => (
		<ul className={styles.second}>
			{secondLevel[category].map((item, n) => (
				<Fragment key={n}>
					<li onClick={() => setSecondCategory(n)}>
						{item._id.secondCategory}
					</li>

					{n === secondCategory && (
						<ul className={styles.thrid}>
							{item.pages.map((item) => (
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
