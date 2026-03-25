import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from './filtersSlice';
import vacanciesReducer from './vacanciesSlice';


export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    vacancies: vacanciesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;