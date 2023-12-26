import React from "react";
import CentersMap from "../components/Map/CentersMap";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";

export default function Homepage() {
  return (
    <>
      <div className="stringspot-layout">
        <Header />
        <div className="main-box-wrapper">
          <CentersMap />
        </div>
        <Footer />
      </div>
    </>
  );
}
