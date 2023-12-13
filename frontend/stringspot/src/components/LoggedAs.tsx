import React from "react-router-dom";
import "../styles/login.css";
import { getFromLocalStorage } from "../localStorage/localStorage";
import UnopDropdown from "unop-react-dropdown";

function LoggedAs() {
  const storeUser = getFromLocalStorage("auth");
  // console.log(storeUser);

  return (
    <>
      <div className="wrapper">
        {/* // todo change or rewrite this dropdown manually */}
        <UnopDropdown
          trigger={
            <button className="connect-button button-dark">Account</button>
          }
          align="CENTER"
          delay={100}
        >
          <div className="dropdown-container">
            <ul>
              <li>Account Dashboard</li>
              <li>Logout</li>
            </ul>
          </div>
        </UnopDropdown>
      </div>
    </>
  );
}
export default LoggedAs;
