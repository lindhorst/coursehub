import Menu from '../Menu';
import Search from '../Search';

import styles from './app.module.scss';

export default function App() {
	return (
		<aside>
			<div className={styles.logo}>
				Course<span>Hub</span>
			</div>

			<Search />

			<Menu />
		</aside>
	);
}
