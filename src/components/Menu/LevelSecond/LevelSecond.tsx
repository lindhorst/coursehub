import { Fragment, useState } from 'react';
import { useLocation } from 'react-router-dom';

import LevelThree from '../LevelThree/LevelThree';

import styles from './LevelSecond.module.scss';

export interface Pages {
	alias: string;
	title: string;
	_id: string;
	category: string;
}

export default function LevelSecond({
	firstActiveCategory,
	secondCategories
}: {
	firstActiveCategory: number;
	secondCategories: {
		[key: number]: {
			_id: { secondCategory: string };
			pages: Pages[];
		}[];
	};
}) {
	const [activeCategory, setActiveCategory] = useState<number | null>(null);
	const { pathname } = useLocation();
	const currentPath = pathname.slice(pathname.lastIndexOf('/') + 1);

	return (
		<ul className={styles.wrapper}>
			{secondCategories[firstActiveCategory]?.map((item, i) => {
				const res = item.pages.some(
					({ alias }) => alias === currentPath
				);

				return (
					<Fragment key={i}>
						<li
							className={styles.item}
							onClick={() =>
								setActiveCategory(
									i === activeCategory ? null : i
								)
							}
						>
							{item._id.secondCategory}
						</li>

						{(i === activeCategory || res) && (
							<LevelThree
								pages={item.pages}
								firstActiveCategory={firstActiveCategory}
							/>
						)}
					</Fragment>
				);
			})}
		</ul>
	);
}
