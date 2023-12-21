import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="footer-wrapper">
        <nav className="footer-nav-links">
          <ul className="footer-nav-items">
            <li>
              <a href="#" className="link">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="link">
                Legal Notices
              </a>
            </li>
          </ul>
          <ul className="socials">
            <li className="social-icon">
              <a href="#">
                <i
                  className="fa-brands fa-instagram"
                  style={{ color: "#ffffff" }}
                ></i>
              </a>
            </li>
            <li className="social-icon">
              <a href="#">
                <i
                  className="fa-brands fa-x-twitter"
                  style={{ color: "#ffffff" }}
                ></i>
              </a>
            </li>
            <li className="social-icon">
              <a href="#">
                <i
                  className="fa-brands fa-linkedin"
                  style={{ color: "#ffffff" }}
                ></i>
              </a>
            </li>
            <li className="social-icon">
              <a href="#">
                <i
                  className="fa-brands fa-youtube"
                  style={{ color: "#ffffff" }}
                ></i>
              </a>
            </li>
            <li className="social-icon">
              <a href="#">
                <i
                  className="fa-brands fa-tiktok"
                  style={{ color: "#ffffff" }}
                ></i>
              </a>
            </li>
          </ul>
        </nav>
      </footer>
    </>
  );
};

export default Footer;
