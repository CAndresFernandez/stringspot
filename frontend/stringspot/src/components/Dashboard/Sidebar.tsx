import React, { useState } from "react";

interface SidebarProps {
  setActiveComponent: React.Dispatch<React.SetStateAction<string>>;
}
const Sidebar: React.FC<SidebarProps> = ({ setActiveComponent }) => {
  const [activeComponent, setActiveComponentInternal] =
    useState("Reservations");

  const handleItemClick = (component: string) => {
    setActiveComponentInternal(component);
    setActiveComponent(component);
  };

  return (
    <div className="col-3 sidebar">
      <h4 className="sidebar-header">My Account</h4>
      <div className="sidebar-list-wrapper">
        <ul className="sidebar-list">
          <li>
            <a
              className={`link sidebar-list-item ${
                activeComponent === "Reservations" ? "active" : ""
              }`}
              onClick={() => handleItemClick("Reservations")}
            >
              Reservations
            </a>
          </li>
          <li>
            <a
              className={`link sidebar-list-item ${
                activeComponent === "Favorites" ? "active" : ""
              }`}
              onClick={() => handleItemClick("Favorites")}
            >
              My centers
            </a>
          </li>
          <li>
            <a
              className={`link sidebar-list-item ${
                activeComponent === "Profile" ? "active" : ""
              }`}
              onClick={() => handleItemClick("Profile")}
            >
              Profile
            </a>
          </li>
          {/* <li>
            <a
              className={`link sidebar-list-item ${
                activeComponent === "Preferences" ? "active" : ""
              }`}
              onClick={() => handleItemClick("Preferences")}
            >
              Preferences
            </a>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
