import React, { useEffect } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import CenterPage from "../components/Centers/CenterPage";

export default function Center() {
  useEffect;

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
