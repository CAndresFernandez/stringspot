import React from "react";

const Footer = () => {
  return (
    <>
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
    </>
  );
};

export default Footer;
