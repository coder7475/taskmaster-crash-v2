import { configureStore } from '@reduxjs/toolkit';
import tasksSlice from './features/tasks/tasksSlice';
import userSlice from './features/user/userSlice';
import baseApi from './features/api/baseApi';

const store = configureStore({
  reducer: {
    tasksSlice: tasksSlice,
    userSlice: userSlice,
    [baseApi.reducerPath]: baseApi.reducer,
  },
});

export default store;
