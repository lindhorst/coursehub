import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

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
	const [searchParams] = useSearchParams();
	const searchParam = searchParams.get('parentId');

	return (
		<ul>
			{firstLevel.map(({ icon, text }, i) => (
				<li key={i}>
					<div
						tabIndex={0}
						className={
							styles.item +
							(i === active || searchParam === `${i}`
								? ' active'
								: '')
						}
						onClick={() => setActive(i === active ? null : i)}
						onKeyDown={e =>
							e.key === 'Enter' &&
							setActive(i === active ? null : i)
						}
					>
						{icon}
						{text}
					</div>

					{(i === active || searchParam === `${i}`) && (
						<SecondLevel active={i} />
					)}
				</li>
			))}
		</ul>
	);
}
