import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import "../styles/new-acct.css";
import NewAccountForm from "../components/NewAccount/NewAccountForm";

export default function NewAccount() {
  return (
    <>
      <div className="stringspot-layout">
        <Header />
        <div className="main-box-wrapper">
          <NewAccountForm />
        </div>
        <Footer />
      </div>
    </>
  );
}
