import Menu from '../../components/Menu';
import Search from '../../components/Search';

import styles from './sidebar.module.scss';

export default function Sidebar() {
	return (
		<aside className={styles.sidebar}>
			<div className={styles.logo}>
				Course<span>Hub</span>
			</div>

			<Search />

			<Menu />
		</aside>
	);
}
