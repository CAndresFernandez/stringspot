import React from "react";
import CentersMap from "../components/map";

export default function Homepage() {
  return (
    <>
      <div className="springspot-homepage">
        <div className="header-wrapper">
          <nav className="navbar">
            <div className="brand-icon" />
            <div className="nav-links">
              <ul className="nav-link-items">
                <li>
                  <a href="#" className="nav-item nav-item-1">
                    Find a court
                  </a>
                </li>
                <li>
                  <a href="#" className="nav-item nav-item-2">
                    Our Story
                  </a>
                </li>
              </ul>
            </div>
            <div className="connect-button-frame">
              <a href="#" className="connect-button">
                Connect
              </a>
            </div>
            <div className="div-wrapper">
              <div className="user-icon" />
            </div>
          </nav>
        </div>
        <div className="main-box-wrapper">
          <div className="main-box green">
            <div className="title-box">
              <h1 className="page-title">
                STRING<span>SPOT</span>
              </h1>
              <div className="div-wrapper-2">
                <p className="find-and-book-your">
                  Find and book your court,{" "}
                  <span className="text-wrapper-3">real fast.</span>
                </p>
              </div>
              <button className="find-court-button">
                <a href="#" className="grey-button-link">
                  Find a court
                </a>
              </button>
            </div>
          </div>
        </div>
        <div className="main-box-wrapper">
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
        </div>
        <div className="main-box-wrapper">
          <div className="main-box green courts">
            <div className="textbox">
              <h3 className="textbox-title">Reserve courts in:</h3>
              <a href="">Paris</a>
              <a href="">London</a>
              <a href="">NYC</a>
              <span>More coming soon...</span>
            </div>
            <div id="map" className="image-box">
              <CentersMap />
            </div>
          </div>
        </div>
        <div className="main-box-wrapper">
          <footer className="footer">
            <nav className="footer-nav-links">
              <ul className="footer-nav-items">
                <li>
                  <a href="#">Contact Us</a>
                </li>
                <li>
                  <a href="#">Legal Notices</a>
                </li>
              </ul>
              <ul className="socials">
                <li className="social-icon">IG</li>
                <li className="social-icon">X</li>
                <li className="social-icon">LI</li>
                <li className="social-icon">YT</li>
                <li className="social-icon">TT</li>
              </ul>
            </nav>
          </footer>
        </div>
      </div>
    </>
  );
}
