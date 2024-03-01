import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
// import ReservationForm from "../components/Reservation/ReservationForm";

export default function Reservation() {
  return (
    <>
      <div className="stringspot-layout">
        <Header />
        <div className="main-box-wrapper">{/* <ReservationForm /> */}</div>
        <Footer />
      </div>
    </>
  );
}
