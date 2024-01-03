import React, { useState } from "react";
import "reset-css";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { getActionDisconnect } from "./store/reducers/userReducer";
import Homepage from "./pages/homepage";
import Dashboard from "./pages/dashboard";
import {
  getFromLocalStorage,
  saveRTToLocalStorage,
} from "./localStorage/localStorage";
import API from "../src/api/axios";

const App = () => {
  const logged = useAppSelector((state) => state.user.logged);
  const storeUser = getFromLocalStorage("auth");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const refresh_token = storeUser.refresh_token;
  const onHomepage = location.pathname === "/";

  useEffect(() => {
    if (!logged) {
      console.log("not logged!");
      dispatch(getActionDisconnect());
      if (!onHomepage) {
        navigate("/");
      }
    } else {
      console.log("logged as:", storeUser.id);
      API.post(`/token/refresh`, { refresh_token }).then((res) => {
        if (res.data.refresh_token) {
          //   const refresh_token = res.data.refresh_token;
        }
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logged]);

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route
        path="/dashboard"
        element={logged ? <Dashboard /> : <Navigate to="/" />}
      />
    </Routes>
  );
};

export default App;
