import { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import SecondLevel from './SecondLevel/SecondLevel';

import { ReactComponent as CoursesIcon } from './icons/courses.svg';
import { ReactComponent as OtherIcon } from './icons/other.svg';
import { ReactComponent as SchoolIcon } from './icons/school.svg';

import styles from './Menu.module.scss';

export const firstLevel = [
	{ icon: <CoursesIcon />, text: 'Курсы', path: '/courses/' },
	{ icon: <SchoolIcon />, text: 'Для школьников', path: '/school/' },
	{ icon: <OtherIcon />, text: 'Прочее', path: '/other/' }
];

export default function Menu() {
	const [active, setActive] = useState<number | null>(null);
	const { pathname } = useLocation();
	const firstPath = pathname.slice(0, pathname.lastIndexOf('/') + 1);

	useEffect(() => setActive(null), [pathname]);

	return (
		<ul className={styles.wrapper}>
			{firstLevel.map(({ icon, text, path }, i) => (
				<Fragment key={i}>
					<li
						onClick={() => setActive(i === active ? null : i)}
						className={
							styles.item +
							(i === active || path === firstPath
								? ' active'
								: '')
						}
					>
						{icon}
						{text}
					</li>

					{(i === active || path === firstPath) && (
						<SecondLevel firstLevelActive={i} />
					)}
				</Fragment>
			))}
		</ul>
	);
}
