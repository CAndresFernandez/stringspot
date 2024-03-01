import React from "react";
import "reset-css";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import {
  getActionDisconnect,
  getActionLogin,
} from "./store/reducers/userReducer";
import Homepage from "./pages/homepage";
import NewAccount from "./pages/new-account";
import Dashboard from "./pages/dashboard";
import { getFromLocalStorage } from "./localStorage/localStorage";
import Reservation from "./pages/reservation";
import Center from "./pages/center";
import API from "../src/api/axios";

const App = () => {
  const logged = useAppSelector((state) => state.user.logged);
  const storeUser = getFromLocalStorage("auth");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onHomepage = location.pathname === "/";

  useEffect(() => {
    // check the refresh_token if a storeUser is found in local storage (interceptor in axios.ts will disconnect if refresh fails)
    const checkToken = async () => {
      try {
        if (storeUser) {
          const response = await API.post("/token/refresh", {
            refresh_token: storeUser.refresh_token,
          });

          dispatch(
            getActionLogin({
              refresh_token: response.data.refresh_token,
              id: response.data.data.id,
              first_name: response.data.data.first_name,
              last_name: response.data.data.last_name,
            })
          );
        } else {
          // If no storeUser, disconnect
          dispatch(getActionDisconnect());
          if (!onHomepage) {
            navigate("/");
          }
        }
      } catch (error) {
        // If there's an error anywhere when trying to refresh, disconnect
        console.error("Error validating token:", error);
        dispatch(getActionDisconnect());
        if (!onHomepage) {
          navigate("/");
        }
      }
    };

    checkToken();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path={`/centers/:centerId`} element={<Center />} />
      <Route path="/new-account" element={<NewAccount />} />
      <Route
        path="/dashboard"
        element={logged ? <Dashboard /> : <Navigate to="/" />}
      />
      <Route path="/reservation" element={<Reservation />} />
    </Routes>
  );
};

export default App;
