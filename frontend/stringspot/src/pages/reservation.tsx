import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import NewReservation from "../components/Reservation/NewReservation";
// import ReservationForm from "../components/Reservation/ReservationForm";

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
