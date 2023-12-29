import React, { useState } from "react";
import "reset-css";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { getFromLocalStorage } from "./localStorage/localStorage";
import { getActionLogin } from "./store/reducers/userReducer";
import Homepage from "./pages/homepage";
import Dashboard from "./pages/dashboard";

const App = () => {
  const logged = useAppSelector((state) => state.user.logged);
  const dispatch = useAppDispatch();
  const [token, setToken] = useState<string | null>(
    getFromLocalStorage("auth")
  );

  useEffect(() => {
    if (!logged) {
      const auth = getFromLocalStorage("auth");

      if (auth) {
        const isTokenExpired = (token: string | null): boolean => {
          if (!token) {
            return true;
          }

          try {
            const decodedToken = JSON.parse(atob(token.split(".")[1]));
            const expirationTime = decodedToken.exp * 1000;
            return expirationTime < Date.now();
          } catch (error) {
            console.error("Error decoding token:", error);
            return true;
          }
        };
        if (isTokenExpired(token)) {
          localStorage.removeItem("auth");
          setToken(null);
        }
        dispatch(getActionLogin(auth));
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logged, token]);

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default App;
