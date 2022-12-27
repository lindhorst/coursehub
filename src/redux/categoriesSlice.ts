import { createSlice } from '@reduxjs/toolkit';

import { routes } from '../helpers';
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

			state.categories.forEach((array, i) => {
				array.forEach(({ _id, pages }) => {
					pages.forEach(item => {
						if (
							_id.secondCategory.match(regex) ||
							item.category.match(regex)
						) {
							item.route = routes[i];

							state.filteredCategories.push(item);
						}
					});
				});
			});
		}
	}
});

export const { setCategories, setFilteredCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
