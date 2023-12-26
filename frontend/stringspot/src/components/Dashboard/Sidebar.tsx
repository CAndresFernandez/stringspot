import React from "react";

interface SidebarProps {
  setActiveComponent: (component: string) => void;
}
const Sidebar: React.FC<SidebarProps> = ({ setActiveComponent }) => {
  const handleItemClick = (component: string) => {
    setActiveComponent(component);
  };

  return (
    <div className="col-3 sidebar">
      <h4 className="sidebar-header">My Account</h4>
      <div className="sidebar-list-wrapper">
        <ul className="sidebar-list">
          <li>
            <a
              className="link sidebar-list-item"
              onClick={() => handleItemClick("Reservations")}
            >
              Reservations
            </a>
          </li>
          <li>
            <a
              className="link sidebar-list-item"
              onClick={() => handleItemClick("Favorites")}
            >
              My centers
            </a>
          </li>
          <li>
            <a
              className="link sidebar-list-item"
              onClick={() => handleItemClick("Profile")}
            >
              Profile
            </a>
          </li>
          <li>
            <a
              className="link sidebar-list-item"
              onClick={() => handleItemClick("Preferences")}
            >
              Preferences
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
