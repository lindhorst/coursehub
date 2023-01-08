import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppSelector } from '../../../hooks';

import { ThridLevel } from '../ThridLevel/ThridLevel';

import styles from './SecondLevel.module.scss';

export default function SecondLevel(props: { active: number }) {
	const [active, setActive] = useState<number | null>(null);
	const { categories } = useAppSelector(({ categories }) => categories);
	const [searchParams] = useSearchParams();
	const searchParam = searchParams.get('category');

	return (
		<ul className={styles.wrapper}>
			{categories[props.active]?.map((category, i) => (
				<li key={i}>
					<span
						tabIndex={0}
						className={styles.item}
						onClick={() => setActive(i === active ? null : i)}
						onKeyDown={e =>
							e.key === 'Enter' &&
							setActive(i === active ? null : i)
						}
					>
						{category._id.secondCategory}
					</span>

					{(i === active ||
						category._id.secondCategory === searchParam) && (
						<ThridLevel
							category={category}
							parentActive={props.active}
						/>
					)}
				</li>
			))}
		</ul>
	);
}
