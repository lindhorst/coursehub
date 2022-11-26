import { createSlice } from '@reduxjs/toolkit';

interface Categories {
	_id: { secondCategory: string };
	pages: {
		alias: string;
		title: string;
		_id: string;
		category: string;
	}[];
}

const categoriesSlice = createSlice({
	name: 'categories',
	initialState: {
		categories: [] as Categories[][]
	},
	reducers: {
		setCategories: (state, { payload }) => {
			state.categories = payload;
		}
	}
});

export const { setCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
