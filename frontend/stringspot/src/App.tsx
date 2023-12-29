import React, { useState } from "react";
import "reset-css";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { getActionDisconnect } from "./store/reducers/userReducer";
import Homepage from "./pages/homepage";
import Dashboard from "./pages/dashboard";

const App = () => {
  const logged = useAppSelector((state) => state.user.logged);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onHomepage = location.pathname === "/";

  useEffect(() => {
    if (!logged) {
      dispatch(getActionDisconnect());
      if (!onHomepage) {
        navigate("/");
      }
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
