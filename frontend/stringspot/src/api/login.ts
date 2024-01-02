import myAxiosInstance from "./axios";

const login = (email: string, password: string) => {
  return myAxiosInstance
    .post("/login_check", {
      email,
      password,
    })
    .then((response) => {
      return response.data;
    });
};

export default login;
