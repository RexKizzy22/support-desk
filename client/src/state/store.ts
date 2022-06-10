import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import ticketReducer from "./slices/ticketSlice";
import noteReducer from "./slices/noteSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ticket: ticketReducer,
    note: noteReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;