import React from "react-router-dom";
import "../styles/logged.css";
import UnopDropdown from "unop-react-dropdown";
import Logout from "./Logout";

function LoggedAs() {
  return (
    <>
      <div className="wrapper">
        {/* // todo change or rewrite this dropdown manually */}
        <UnopDropdown
          trigger={
            <button className="account-button button-dark">Account</button>
          }
          align="CENTER"
          delay={100}
        >
          <div className="dropdown-container-logged">
            <ul className="dropdown-items">
              <div className="dropdown-row">
                <div className="dropdown-item">
                  <li className="item-wrapper">
                    <a href="#" className="">
                      Dashboard
                    </a>
                  </li>
                </div>

                <div className="dropdown-item">
                  <Logout />
                </div>
              </div>
            </ul>
          </div>
        </UnopDropdown>
      </div>
    </>
  );
}
export default LoggedAs;
