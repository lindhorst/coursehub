import { createSlice } from '@reduxjs/toolkit';

const coursesSlice = createSlice({
	name: 'courses',
	initialState: {
		title: ''
	},
	reducers: {
		setTitle: (state, { payload }) => {
			state.title = payload;
		}
	}
});

export const { setTitle } = coursesSlice.actions;

export default coursesSlice.reducer;
