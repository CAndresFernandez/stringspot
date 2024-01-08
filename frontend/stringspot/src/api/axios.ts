import axios from "axios";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../localStorage/localStorage";

const myAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

myAxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

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
        console.log("Error refreshing token:", error);
      }
    }
    return Promise.reject(error);
  }
);

export default myAxiosInstance;
