import React from "react";
import CentersMap from "../components/CentersMap";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Homepage() {
  return (
    <>
      <div className="springspot-homepage">
        <Header />
        <div className="main-box-wrapper">
          <CentersMap />
        </div>
        {/* <div className="main-box-wrapper"> */}
        <Footer />
        {/* </div> */}
      </div>
    </>
  );
}
