import React from "react-router-dom";
import "../../styles/logged.css";
import UnopDropdown from "unop-react-dropdown";
import Logout from "./Logout";
import { Link } from "react-router-dom";
import { getFromLocalStorage } from "../../localStorage/localStorage";
import { useAppSelector } from "../../hooks/redux";
import { useEffect, useState } from "react";
import API from "../../api/axios";
import { IUser } from "../../@types/user";

const LoggedAs = () => {
  //   const logged = useAppSelector((state) => state.user.logged);
  const storeUser = getFromLocalStorage("auth");
  const [user, setUser] = useState<IUser>();
  const [initials, setInitials] = useState("");

  useEffect(() => {
    if (storeUser?.id) {
      API.get(`users/${storeUser?.id}`).then((res) => {
        const user = res.data;
        setUser(user);
        let initials: string =
          user.first_name.charAt(0) + user.last_name.charAt(0);
        setInitials(initials);
      });
    }
  }, [storeUser?.id]);

  return (
    <>
      <div className="wrapper">
        {/* // todo change or rewrite this dropdown manually */}
        <>
          <UnopDropdown
            trigger={
              <button className="acct-button">
                {user ? (
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
