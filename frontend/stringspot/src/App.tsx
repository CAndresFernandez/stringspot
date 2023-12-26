import React from "react";
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

  useEffect(() => {
    if (!logged) {
      const auth = getFromLocalStorage("auth");

      if (auth) {
        dispatch(getActionLogin(auth));
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logged]);

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default App;
