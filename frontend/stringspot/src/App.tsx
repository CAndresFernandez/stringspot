import React, { useState } from "react";
import "reset-css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import Login from "./components/Login";
import { getFromLocalStorage } from "./localStorage/localStorage";
import { getActionLogin } from "./store/reducers/userReducer";
import Homepage from "./pages/homepage";

const App = () => {
  //   useEffect(() => {
  //     const auth = getFromLocalStorage("auth");

  //     if (!auth || !auth.token) {
  //       return;
  //     }

  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
    </Routes>
  );
};

export default App;
