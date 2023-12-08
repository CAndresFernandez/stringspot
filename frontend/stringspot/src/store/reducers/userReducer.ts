import { createAction, createReducer } from "@reduxjs/toolkit";
import myAxiosInstance from "../../api/axios";
import { saveToLocalStorage } from "../../localStorage/localStorage";

export interface RootState {
  id: number;
  logged?: boolean;
  email?: string;
  token: null | string;
  roles?: [];
  name: string;
  lastName: string;
}

export const initialState: RootState = {
  id: 0,
  logged: false,
  email: "",
  token: null,
  name: "",
  lastName: "",
  roles: [],
};

export const getActionDisconnect = createAction("email/DISCONNECT");
export const getActionLogin = createAction<{
  token: string;
  id: number;
  name: string;
  roles: [];
}>("email");
// export const refreshFromLocalStorage = createAction<{}>("email/REFRESH");

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getActionLogin, (state, action) => {
      // mettre isLogged à true dans le state
      // enregistrer le speudo et le tocken dans le state
      // console.log(action.id, action.token);
      state.logged = true;
      state.id = action.payload.id;
      state.token = action.payload.token;
      state.name = action.payload.name;
      state.roles = action.payload.roles;
      myAxiosInstance.defaults.headers.common.Authorization = `Bearer ${action.payload.token}`;

      // on va aussi enregistrer le token dans le localStorage
      saveToLocalStorage("auth", {
        token: action.payload.token,
        id: action.payload.id,
        name: action.payload.name,
        roles: action.payload.roles,
      });
    })
    .addCase(getActionDisconnect, (state) => {
      state.logged = false;
      delete myAxiosInstance.defaults.headers.common.Authorization;
      localStorage.removeItem("auth");
    });
});

export default userReducer;
