import React from "react";
import Login from "./Login";
import LoggedAs from "./LoggedAs";
import { useAppSelector } from "../../hooks/redux";
import { getFromLocalStorage } from "../../localStorage/localStorage";
import { Link } from "react-router-dom";

const Header = () => {
  const logged = useAppSelector((state) => state.user.logged);
  const storeUser = getFromLocalStorage("auth");

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
              <li>
                <a href="#" className="nav-item link">
                  Find.
                </a>
              </li>
              <li>
                <a href="#" className="nav-item link">
                  Book.
                </a>
              </li>
              <li>
                <a href="#" className="nav-item link">
                  Play.
                </a>
              </li>
            </ul>
          </div>
          {logged ? (
            <div className="div-wrapper logged-as">
              <div>Welcome back,</div>
              <div>
                <span className="username">{storeUser?.name}</span>
              </div>
            </div>
          ) : null}
          {logged ? <LoggedAs /> : <Login />}
        </nav>
      </div>
    </>
  );
};

export default Header;
