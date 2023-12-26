import React from "react";

function Sidebar() {
  return (
    <div className="col-2 sidebar">
      <h4 className="sidebar-header">sidebar header</h4>
      <div className="sidebar-list-wrapper">
        <ul className="sidebar-list">
          <li className="sidebar-list-item">Active reservations</li>
          <li className="sidebar-list-item">Past reservations</li>
          <li className="sidebar-list-item">My centers</li>
          <li className="sidebar-list-item">Profile</li>
          <li className="sidebar-list-item">Preferences</li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
