import React from "react";

const Header = () => {
  return (
    <>
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
            <a href="#" className="link-dark">
              Connect
            </a>
          </div>
          <div className="div-wrapper">
            <div className="user-icon" />
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
