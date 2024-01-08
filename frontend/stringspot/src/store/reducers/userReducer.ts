import { createAction, createReducer } from "@reduxjs/toolkit";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../../localStorage/localStorage";

export interface RootState {
  id: number;
  logged?: boolean;
  email?: string;
  refresh_token: null | string;
  //   roles?: [];
  first_name: string;
  last_name: string;
  //   pastRes: IPastRes[];
}

const storedUser = getFromLocalStorage("auth");

export const initialState: RootState = {
  id: storedUser ? storedUser.id : 0,
  logged: !!storedUser,
  email: "",
  refresh_token: storedUser ? storedUser.refresh_token : null,
  first_name: storedUser ? storedUser.first_name : "",
  last_name: storedUser ? storedUser.last_name : "",
};

export const getActionDisconnect = createAction("email/DISCONNECT");
export const getActionLogin = createAction<{
  refresh_token: string;
  id: number;
  first_name: string;
  last_name: string;
}>("email");

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getActionLogin, (state, action) => {
      state.logged = true;
      state.refresh_token = action.payload.refresh_token;
      state.id = action.payload.id;
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;

      saveToLocalStorage("auth", {
        refresh_token: action.payload.refresh_token,
        id: action.payload.id,
        first_name: action.payload.first_name,
        last_name: action.payload.last_name,
      });
    })
    .addCase(getActionDisconnect, (state) => {
      state.logged = false;
      localStorage.removeItem("auth");
    });
});

export default userReducer;
