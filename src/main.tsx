import React from 'react';
import ReactDOM from 'react-dom/client';

import Sidebar from './layout/Sidebar';

import './styles/fonts.scss';
import './styles/globals.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Sidebar />
	</React.StrictMode>
);
