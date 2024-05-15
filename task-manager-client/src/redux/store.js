import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './tasksSlice'; // Use the default export
import dateReducer from './dateSlice'; // Use the default export

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    date: dateReducer,
  }
});
