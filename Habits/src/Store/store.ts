import { configureStore } from "@reduxjs/toolkit";
import HabitReducer from "./habitSlice";

export const store = configureStore({
  reducer: {
    habits: HabitReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
