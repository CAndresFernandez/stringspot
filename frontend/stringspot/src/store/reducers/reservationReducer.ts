import { createAction, createReducer } from "@reduxjs/toolkit";
import { ICourt } from "../../@types/reservation";

export interface ReservationRootState {
  court?: ICourt;
  start_time?: string;
  end_time?: string;
}

export const initialState: ReservationRootState = {
  court: undefined,
  start_time: undefined,
  end_time: undefined,
};

export const setReservation = createAction<{
  court: ICourt;
  start_time: string;
  end_time: string;
}>("reservation");

const reservationReducer = createReducer(initialState, (builder) => {
  builder.addCase(setReservation, (state, action) => {
    return {
      ...state,
      court: action.payload.court,
      start_time: action.payload.start_time,
      end_time: action.payload.end_time,
    };
  });
});

export default reservationReducer;
