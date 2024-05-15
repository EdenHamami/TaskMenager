import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedDate: '2024-05-15',
};

const dateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    setDate(state, action) {
      state.selectedDate = action.payload;
    },
  },
});

export const { setDate } = dateSlice.actions;
export const selectDate = (state) => state.date.selectedDate;
export default dateSlice.reducer; // Ensure the reducer is exported as default
