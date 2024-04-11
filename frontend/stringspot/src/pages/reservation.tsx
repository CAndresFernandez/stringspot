import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import NewReservation from "../components/Reservation/NewReservation";
import "../styles/res-confirm.css";

export default function Reservation() {
  return (
    <>
      <div className="stringspot-layout">
        <Header />
        <div className="main-box-wrapper">
          <NewReservation />
        </div>
        <Footer />
      </div>
    </>
  );
}
