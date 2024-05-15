import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getTasksByDate } from '../api/tasksApi';

const initialState = { 
    tasks: [],
    status: 'idle',
    error: null
};

// Thunk to fetch tasks by date
export const fetchTasksByDate = createAsyncThunk(
    'tasks/fetchTasksByDate',
    async (_, { getState }) => {
      const state = getState();
      const date = state.date.selectedDate;
      const response = await getTasksByDate(date);
      return response.data;
    }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action) {
      state.tasks.push(action.payload);
    },
    removeTask(state, action) {
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
    },
    toggleTaskCompletion(state, action) {
      state.tasks = state.tasks.map(task =>
        task.id === action.payload
          ? { ...task, isCompleted: !task.isCompleted }
          : task
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasksByDate.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasksByDate.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(fetchTasksByDate.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { addTask, removeTask, toggleTaskCompletion } = tasksSlice.actions;
export default tasksSlice.reducer; // Ensure the reducer is exported as default
