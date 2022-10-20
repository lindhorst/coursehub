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
	const [activeCategory, setActiveCategory] = useState<number>();
	const { pathname } = useLocation();

	return (
		<ul className={styles.wrapper}>
			{secondCategories[firstActiveCategory].map((item, i) => {
				if (activeCategory === undefined && pathname !== '/') {
					const secondPath = pathname.slice(
						pathname.lastIndexOf('/') + 1
					);

					const res = item.pages.some(
						({ alias }) => alias === secondPath
					);

					res && setActiveCategory(i);
				}

				return (
					<Fragment key={i}>
						<li
							className={styles.item}
							onClick={() => setActiveCategory(i)}
						>
							{item._id.secondCategory}
						</li>

						{activeCategory === i && (
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
