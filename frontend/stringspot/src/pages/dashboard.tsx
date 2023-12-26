import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import "../styles/dashboard.css";
import Preferences from "../components/Dashboard/Preferences";
import Sidebar from "../components/Dashboard/Sidebar";
import Reservations from "../components/Dashboard/Reservations";

import { useState } from "react";
import Profile from "../components/Dashboard/Profile";
import Favorites from "../components/Dashboard/Favorites";

export default function Dashboard() {
  const [activeComponent, setActiveComponent] = useState("Reservations");
  const renderComponent = () => {
    switch (activeComponent) {
      case "Profile":
        return <Profile />;
      case "Favorites":
        return <Favorites />;
      case "Preferences":
        return <Preferences />;
      default:
        return <Reservations />;
    }
  };

  return (
    <>
      <div className="stringspot-layout">
        <Header />
        <div className="main-wrapper">
          <Sidebar setActiveComponent={setActiveComponent} />
          <div className="col-9 component-wrapper">{renderComponent()}</div>
        </div>
        <Footer />
      </div>
    </>
  );
}
