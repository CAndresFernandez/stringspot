import axios from "axios";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../localStorage/localStorage";
import { useAppDispatch } from "../hooks/redux";
import { getActionDisconnect } from "../store/reducers/userReducer";

const myAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;

myAxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const storeUser = getFromLocalStorage("auth");
          const refresh_token = storeUser.refresh_token;
          const response = await myAxiosInstance.post("/token/refresh", {
            refresh_token: refresh_token,
          });

          localStorage.removeItem("auth");
          saveToLocalStorage("auth", {
            refresh_token: response.data.refresh_token,
            id: response.data.data.id,
            first_name: response.data.data.first_name,
            last_name: response.data.data.last_name,
          });

          return axios(originalRequest);
        } catch (error) {
          console.error("Error refreshing token:", error);
          const dispatch = useAppDispatch();
          dispatch(getActionDisconnect());
          return Promise.reject(error);
        } finally {
          isRefreshing = false;
        }
      } else {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default myAxiosInstance;
