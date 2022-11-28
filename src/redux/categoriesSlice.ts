import { createSlice } from '@reduxjs/toolkit';

export interface Pages {
	alias: string;
	title: string;
	_id: string;
	category: string;
}

interface Categories {
	_id: { secondCategory: string };
	pages: Pages[];
}

const categoriesSlice = createSlice({
	name: 'categories',
	initialState: {
		categories: [] as Categories[][],
		filteredCategories: [] as Pages[]
	},
	reducers: {
		setCategories: (state, { payload }) => {
			state.categories = payload;
		},
		setFilteredCategories: (state, { payload }) => {
			state.filteredCategories = [];

			const regex = new RegExp(`${payload}`, 'ig');

			state.categories.forEach(array => {
				array.forEach(({ _id, pages }) => {
					let res = pages.filter(
						({ category }) =>
							_id.secondCategory.match(regex) ||
							category.match(regex)
					);

					if (res.length) {
						res = state.filteredCategories.concat(res);
						state.filteredCategories = res;
					}
				});
			});
		}
	}
});

export const { setCategories, setFilteredCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
