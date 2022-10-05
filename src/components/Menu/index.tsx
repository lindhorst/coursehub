import { ReactComponent as CoursesIcon } from './icons/courses.svg';
import { ReactComponent as BettingIcon } from './icons/betting.svg';
import { ReactComponent as SchoolIcon } from './icons/school.svg';

import styles from './menu.module.scss';

export default function Menu() {
	return (
		<ul className={styles.menu}>
			<li>
				<CoursesIcon />
				Курсы
			</li>

			<li>
				<SchoolIcon />
				Для школьников
			</li>

			<li>
				<BettingIcon />
				Прочее
			</li>
		</ul>
	);
}
