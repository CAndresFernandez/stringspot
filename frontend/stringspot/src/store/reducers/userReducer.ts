import { createAction, createReducer } from "@reduxjs/toolkit";
import myAxiosInstance from "../../api/axios";
import { saveToLocalStorage } from "../../localStorage/localStorage";
import { IPastRes } from "../../@types/user";

export interface RootState {
  id: number;
  logged?: boolean;
  email?: string;
  token: null | string;
  refresh_token: null | string;
  //   roles?: [];
  first_name: string;
  last_name: string;
  //   pastRes: IPastRes[];
}

export const initialState: RootState = {
  id: 0,
  logged: false,
  email: "",
  token: null,
  refresh_token: null,
  first_name: "",
  last_name: "",
  //   roles: [],
  //   pastRes: [],
};

export const getActionDisconnect = createAction("email/DISCONNECT");
export const getActionLogin = createAction<{
  token: string;
  refresh_token: string;
  id: number;
  first_name: string;
  last_name: string;
  //   roles: [];
  //   pastRes: [];
}>("email");

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getActionLogin, (state, action) => {
      state.logged = true;
      //   state.token = action.payload.token;
      state.refresh_token = action.payload.refresh_token;
      state.id = action.payload.id;
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
      //   state.roles = action.payload.roles;
      //   state.pastRes = action.payload.pastRes;
      //   myAxiosInstance.defaults.headers.common.Authorization = `Bearer ${action.payload.token}`;

      saveToLocalStorage("auth", {
        refresh_token: action.payload.refresh_token,
        // token: action.payload.token,
        id: action.payload.id,
        first_name: action.payload.first_name,
        last_name: action.payload.last_name,
        // roles: action.payload.roles,
        // pastRes: action.payload.pastRes,
      });
    })
    .addCase(getActionDisconnect, (state) => {
      state.logged = false;
      //   delete myAxiosInstance.defaults.headers.common.Authorization;
      localStorage.removeItem("auth");
    });
});

export default userReducer;
