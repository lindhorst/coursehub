import { createSlice } from '@reduxjs/toolkit';

import type { Pages } from '../interfaces';

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

			state.categories.forEach((category, i) => {
				category.forEach(({ _id, pages }) => {
					pages.forEach(page => {
						if (
							_id.secondCategory.match(regex) ||
							page.category.match(regex)
						) {
							page.path = `${page.alias}?category=${_id.secondCategory}&parentId=${i}`;

							state.filteredCategories.push(page);
						}
					});
				});
			});
		}
	}
});

export const { setCategories, setFilteredCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
