import myAxiosInstance from "./axios";

const login = (email: string, password: string) => {
  return myAxiosInstance
    .post("/login_check", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.email) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      console.log(response.data);
      return response.data;
    });
};

export default login;
