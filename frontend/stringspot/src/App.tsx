import React, { useState } from "react";
import "reset-css";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import {
  getActionDisconnect,
  getActionLogin,
} from "./store/reducers/userReducer";
import Homepage from "./pages/homepage";
import Dashboard from "./pages/dashboard";
import { getFromLocalStorage } from "./localStorage/localStorage";
import Reservation from "./pages/reservation";
import Center from "./pages/center";

const App = () => {
  const logged = useAppSelector((state) => state.user.logged);
  const storeUser = getFromLocalStorage("auth");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onHomepage = location.pathname === "/";

  useEffect(() => {
    if (!storeUser) {
      dispatch(getActionDisconnect());
      if (!onHomepage) {
        navigate("/");
      }
    } else {
      dispatch(
        getActionLogin({
          refresh_token: storeUser.refresh_token,
          id: storeUser.id,
          first_name: storeUser.first_name,
          last_name: storeUser.last_name,
        })
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route
        path="/dashboard"
        element={logged ? <Dashboard /> : <Navigate to="/" />}
      />
      <Route path={`/centers/:centerId`} element={<Center />} />
      <Route
        path="/reservation"
        element={logged ? <Reservation /> : <Navigate to="/" />}
      />
    </Routes>
  );
};

export default App;
