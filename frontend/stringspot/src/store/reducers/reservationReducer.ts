import { createAction, createReducer } from "@reduxjs/toolkit";
import { ICourt } from "../../@types/court";
import { ICenter } from "../../@types/center";

export interface ReservationRootState {
  court?: ICourt;
  center?: ICenter;
  startTime?: string;
  endTime?: string;
}

export const initialState: ReservationRootState = {
  court: undefined,
  center: undefined,
  startTime: "",
  endTime: "",
};

export const setReservation = createAction<{
  court: ICourt;
  center: ICenter;
  startTime: string;
  endTime: string;
}>("reservation");

const reservationReducer = createReducer(initialState, (builder) => {
  builder.addCase(setReservation, (state, action) => {
    return {
      ...state,
      court: action.payload.court,
      center: action.payload.center,
      startTime: action.payload.startTime,
      endTime: action.payload.endTime,
    };
  });
});

export default reservationReducer;
