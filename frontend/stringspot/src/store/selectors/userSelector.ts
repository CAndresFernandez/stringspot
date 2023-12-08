import { getJWTFromLocalStorage } from "../../localStorage/localStorage";

const isLogged = () => {
  return getJWTFromLocalStorage();
};

export default isLogged;
