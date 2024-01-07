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
  const [initials, setInitials] = useState("");

  useEffect(() => {
    if (logged) {
      let initials: string =
        storeUser.first_name.charAt(0) + storeUser.last_name.charAt(0);
      setInitials(initials);
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
                      <div className="acct-button-initials">{initials}</div>
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
