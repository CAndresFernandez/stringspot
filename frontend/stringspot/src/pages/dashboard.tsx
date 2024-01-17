import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import "../styles/dashboard.css";
import Sidebar from "../components/Dashboard/Sidebar";
import Reservations from "../components/Dashboard/Reservations";
import { useState } from "react";
import Profile from "../components/Dashboard/Profile";
import Favorites from "../components/Dashboard/Favorites";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";

export default function Dashboard() {
  const logged = useAppSelector((state) => state.user.logged);
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState("Reservations");
  const renderComponent = () => {
    switch (activeComponent) {
      case "Favorites":
        return <Favorites />;
      case "Profile":
        return <Profile />;

      default:
        return <Reservations />;
    }
  };

  return (
    <>
      {logged ? (
        <div className="stringspot-layout">
          <Header />
          <div className="main-dashboard-wrapper">
            <Sidebar setActiveComponent={setActiveComponent} />
            <div className="col-9 component-wrapper">{renderComponent()}</div>
          </div>
          <Footer />
        </div>
      ) : (
        navigate("/")
      )}
    </>
  );
}
