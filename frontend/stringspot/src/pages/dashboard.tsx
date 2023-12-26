import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import "../styles/dashboard.css";
import Preferences from "../components/Dashboard/Preferences";
import Sidebar from "../components/Dashboard/Sidebar";
import ActiveReservations from "../components/Dashboard/ActiveReservations";
import PastReservations from "../components/Dashboard/PastReservations";

export default function Dashboard() {
  return (
    <>
      <div className="stringspot-layout">
        <Header />
        <div className="container-fluid">
          <div className="row main-box-wrapper ">
            <Sidebar />
            <div className="col-10">
              <ActiveReservations />
              <PastReservations />
              <Preferences />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
