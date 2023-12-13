import React from "react";
import Login from "./Login";
import LoggedAs from "./LoggedAs";
import { useAppSelector } from "../hooks/redux";
import { getFromLocalStorage } from "../localStorage/localStorage";

const Header = () => {
  const logged = useAppSelector((state) => state.user.logged);
  const storeUser = getFromLocalStorage("auth");

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
          {logged ? (
            <div className="div-wrapper logged-as">
              <div>Welcome back,</div>
              <div>
                <span className="username">{storeUser?.name}</span>
              </div>
            </div>
          ) : null}
          {logged ? <LoggedAs /> : <Login />}
          {/* <div className="div-wrapper">
            <div className="user-icon" />
          </div> */}
        </nav>
      </div>
    </>
  );
};

export default Header;
