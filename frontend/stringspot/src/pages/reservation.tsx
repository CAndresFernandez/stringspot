import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";

export default function Reservation() {
  const logged = useAppSelector((state) => state.user.logged);
  const navigate = useNavigate();

  return (
    <>
      {logged ? (
        <div className="stringspot-layout">
          <Header />
          <div className="main-box-wrapper">
            <div className="component-wrapper">New Reservation</div>
          </div>
          <Footer />
        </div>
      ) : (
        navigate("/")
      )}
    </>
  );
}
