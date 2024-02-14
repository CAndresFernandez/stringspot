import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import CenterPage from "../components/Centers/CenterPage";
import "../styles/center.css";

export default function Center() {
  return (
    <>
      <div className="stringspot-layout">
        <Header />
        <div className="main-box-wrapper">
          <CenterPage />
        </div>
        <Footer />
      </div>
    </>
  );
}
