import React from "react-router-dom";
import "../../styles/logged.css";
import UnopDropdown from "unop-react-dropdown";
import Logout from "./Logout";
import { Link } from "react-router-dom";
import { getFromLocalStorage } from "../../localStorage/localStorage";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/redux";

const LoggedAs = () => {
  const logged = useAppSelector((state) => state.user.logged);
  const storeUser = getFromLocalStorage("auth");
  const [firstInitial, setFirstInitial] = useState("");
  const [lastInitial, setLastInitial] = useState("");

  useEffect(() => {
    if (logged) {
      let firstInitial: string = storeUser.first_name.charAt(0);
      let lastInitial: string = storeUser.last_name.charAt(0);
      setFirstInitial(firstInitial.toLowerCase());
      setLastInitial(lastInitial.toLowerCase());
    }
  }, [logged, storeUser]);

  return (
    <>
      <div className="wrapper">
        {/* // todo change or rewrite this dropdown manually */}
        <>
          <UnopDropdown
            trigger={
              <button className="acct-button">
                {logged ? (
                  <>
                    <div className="acct-button-2">
                      <i className={`fa-solid fa-${firstInitial}`}></i>
                      <i className={`fa-solid fa-${lastInitial}`}></i>
                    </div>
                  </>
                ) : (
                  ""
                )}
              </button>
            }
            align="CENTER"
            delay={100}
          >
            <div className="dropdown-container-logged">
              <ul className="dropdown-items">
                <div className="dropdown-row">
                  <div className="dropdown-item">
                    <li className="item-wrapper">
                      <Link to={`/dashboard`}>Dashboard</Link>
                    </li>
                  </div>
                  <div className="dropdown-item">
                    <Logout />
                  </div>
                </div>
              </ul>
            </div>
          </UnopDropdown>
        </>
      </div>
    </>
  );
};
export default LoggedAs;
