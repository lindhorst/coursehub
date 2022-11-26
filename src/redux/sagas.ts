import { call, all, put } from 'redux-saga/effects';

import { fetchCategories } from '../api';
import { setCategories } from './categoriesSlice';

export function* categoriesSaga() {
	const { courses, school, others } = yield all({
		courses: call(fetchCategories, 0),
		school: call(fetchCategories, 4),
		others: call(fetchCategories, 1)
	});

	yield put(setCategories([courses, school, others]));
}

export default function* rootSaga() {
	yield call(categoriesSaga);
}
