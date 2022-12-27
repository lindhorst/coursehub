import { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { routes } from '../../helpers';

import SecondLevel from './SecondLevel/SecondLevel';

import { ReactComponent as CoursesIcon } from './icons/courses.svg';
import { ReactComponent as OtherIcon } from './icons/other.svg';
import { ReactComponent as SchoolIcon } from './icons/school.svg';

import styles from './Menu.module.scss';

const firstLevel = [
	{ icon: <CoursesIcon />, text: 'Курсы' },
	{ icon: <SchoolIcon />, text: 'Для школьников' },
	{ icon: <OtherIcon />, text: 'Прочее' }
];

export default function Menu() {
	const [active, setActive] = useState<number | null>(null);
	const { pathname } = useLocation();
	const route = pathname.slice(0, pathname.lastIndexOf('/') + 1);

	useEffect(() => setActive(null), [pathname]);

	return (
		<ul className={styles.wrapper}>
			{firstLevel.map(({ icon, text }, i) => (
				<Fragment key={i}>
					<li
						tabIndex={0}
						onClick={() => setActive(i === active ? null : i)}
						onKeyDown={e =>
							e.key === 'Enter' &&
							setActive(i === active ? null : i)
						}
						className={
							styles.item +
							(i === active || routes[i] === route
								? ' active'
								: '')
						}
					>
						{icon}
						{text}
					</li>

					{(i === active || routes[i] === route) && (
						<SecondLevel firstLevelActive={i} />
					)}
				</Fragment>
			))}
		</ul>
	);
}
