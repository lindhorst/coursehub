import Menu from '../Menu/Menu';
import Search from '../Search/Search';

import styles from './App.module.scss';

export default function App() {
	return (
		<div className={styles.wrapper}>
			<aside>
				<div className={styles.logo}>
					Course<span>Hub</span>
				</div>

				<Search />

				<Menu />
			</aside>
		</div>
	);
}
