import {
  saveRTToLocalStorage,
  saveUserIdToLocalStorage,
} from "../localStorage/localStorage";
import myAxiosInstance from "./axios";

const login = (email: string, password: string) => {
  return myAxiosInstance
    .post("/login_check", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        const refresh_token = response.data.refresh_token;
        const id = response.data.data.id;

        saveUserIdToLocalStorage(id);

        saveRTToLocalStorage(refresh_token);
      }
      return response.data;
    });
};

export default login;
