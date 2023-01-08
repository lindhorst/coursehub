import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './sagas';
import categoriesSlice from './categoriesSlice';
import couesesSlice from './couesesSlice';

const saga = createSagaMiddleware();

export const store = configureStore({
	reducer: {
		categories: categoriesSlice,
		filteredCategories: categoriesSlice,
		title: couesesSlice
	},
	middleware: [saga]
});

saga.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
