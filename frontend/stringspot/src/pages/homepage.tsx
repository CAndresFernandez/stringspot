import React from "react";
import CentersMap from "../components/CentersMap";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Homepage() {
  return (
    <>
      <div className="springspot-homepage">
        <Header />
        {/* <div className="main-box-wrapper">
          <div className="main-box grey how">
            <h2>How it works</h2>
            <div className="ellipse-frame">
              <div className="ellipse"></div>
              <div className="ellipse"></div>
              <div className="ellipse"></div>
            </div>
            <div className="ellipse-tags">
              <p className="tag-items">something</p>
              <p className="tag-items">something else</p>
              <p className="tag-items">something more</p>
            </div>
          </div>
        </div> */}
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
