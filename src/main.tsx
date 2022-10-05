import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import Sidebar from './layout/Sidebar';
import { store } from './redux/store';

import './styles/fonts.scss';
import './styles/globals.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<Sidebar />
		</Provider>
	</React.StrictMode>
);
