import React from "react";
import Login from "./Login";

const Header = () => {
  return (
    <>
      <div className="header-wrapper">
        <nav className="navbar">
          <div className="brand-icon" />
          <div className="nav-links">
            <ul className="nav-link-items">
              <li>
                <a href="#" className="nav-item nav-item-1 link-light">
                  Find a court
                </a>
              </li>
              <li>
                <a href="#" className="nav-item nav-item-2 link-light">
                  Our Story
                </a>
              </li>
            </ul>
          </div>
          <Login />
          {/* <button className="connect-button button-dark">Connect</button> */}
          <div className="div-wrapper">
            <div className="user-icon" />
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
