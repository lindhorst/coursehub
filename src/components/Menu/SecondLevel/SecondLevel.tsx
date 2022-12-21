import { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useAppSelector } from '../../../hooks';

import { ThridLevel } from '../ThridLevel/ThridLevel';

import styles from './SecondLevel.module.scss';

export default function SecondLevel({
	firstLevelActive
}: {
	firstLevelActive: number;
}) {
	const [active, setActive] = useState<number | null>(null);
	const { categories } = useAppSelector(({ categories }) => categories);
	const { pathname } = useLocation();
	const route = pathname.slice(pathname.lastIndexOf('/') + 1);

	useEffect(() => setActive(null), [pathname]);

	return (
		<ul className={styles.wrapper}>
			{categories[firstLevelActive]?.map((item, i) => {
				const res = item.pages.some(({ alias }) => alias === route);

				return (
					<Fragment key={i}>
						<li
							className={styles.item}
							onClick={() => setActive(i === active ? null : i)}
						>
							{item._id.secondCategory}
						</li>

						{(i === active || res) && (
							<ThridLevel
								pages={item.pages}
								firstLevelActive={firstLevelActive}
							/>
						)}
					</Fragment>
				);
			})}
		</ul>
	);
}
