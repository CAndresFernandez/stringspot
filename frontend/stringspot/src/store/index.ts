import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import reservationReducer from "./reducers/reservationReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    reservation: reservationReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
