import React from "react";
import Login from "./Login";
import LoggedAs from "./LoggedAs";
import { useAppSelector } from "../../hooks/redux";
import { Link } from "react-router-dom";

const Header = () => {
  const logged = useAppSelector((state) => state.user.logged);

  return (
    <>
      <div className="header-wrapper">
        <nav className="navbar">
          <div className="title-wrapper">
            <Link to={`/`}>
              <h1 className="page-title">
                STRING<span>SPOT</span>
              </h1>
            </Link>
          </div>
          <div className="nav-links">
            <ul className="nav-link-items">
              <li>Find.</li>
              <li>Book.</li>
              <li>Play.</li>
            </ul>
          </div>
          {logged ? <LoggedAs /> : <Login />}
        </nav>
      </div>
    </>
  );
};

export default Header;
