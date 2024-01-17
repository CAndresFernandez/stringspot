import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux";
import API from "../../api/axios";

const NewAccountForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [repeatPasswordError, setRepeatPasswordError] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleCreateNewAcct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setFirstNameError("");
    setLastNameError("");
    setEmailError("");
    setPasswordError("");
    setRepeatPasswordError("");

    if ("" === firstName) {
      setFirstNameError("Enter your first name");
      return;
    }

    if ("" === lastName) {
      setLastNameError("Enter your last name");
      return;
    }

    if ("" === email) {
      setEmailError("Enter an e-mail address");
      return;
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("Please enter a valid email");
      return;
    }

    if ("" === password) {
      setPasswordError("Enter a password");
      return;
    }

    if ("" === repeatPassword) {
      setRepeatPasswordError("Repeat your password");
      return;
    }

    if (password !== repeatPassword) {
      setRepeatPasswordError("Your passwords don't match");
      return;
    }

    try {
      API.post(`/users`, {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
      });
    } catch (error) {
      setError("Couldn't create account. Please try again");
      console.log(error);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <>
      <div className="new-acct-form">
        <h4 className="h4-dark page-title">New account</h4>
        <form onSubmit={handleCreateNewAcct}>
          <div className="form-input-container">
            <label htmlFor="form-input-firstname" className="form-input-label">
              First name
            </label>
            <input
              id="form-input-firstname"
              type="text"
              className="form-input"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <div className="error-wrapper">
              <label className="error-label">{firstNameError}</label>
            </div>
          </div>
          <div className="form-input-container">
            <label htmlFor="form-input-lastname" className="form-input-label">
              Last name
            </label>
            <input
              id="form-input-lastname"
              type="text"
              className="form-input"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <div className="error-wrapper">
              <label className="error-label">{lastNameError}</label>
            </div>
          </div>
          <div className="form-input-container">
            <label htmlFor="form-input-email" className="form-input-label">
              Email Address
            </label>
            <input
              id="form-input-email"
              type="text"
              className="form-input"
              placeholder="E-mail Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="error-wrapper">
              <label className="error-label">{emailError}</label>
            </div>
          </div>
          <div className="form-input-container">
            <label htmlFor="form-input-pw" className="form-input-label">
              Password
            </label>
            <input
              id="form-input-pw"
              type="password"
              className="form-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="error-wrapper">
              <label className="error-label">{passwordError}</label>
            </div>
          </div>
          <div className="form-input-container">
            <label htmlFor="form-input-pwrepeat" className="form-input-label">
              Repeat Password
            </label>
            <input
              id="form-input-pwrepeat"
              type="password"
              className="form-input"
              placeholder="Repeat password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </div>
          <div className="error-wrapper">
            <label className="error-label">{repeatPasswordError}</label>
          </div>
          <button
            type="submit"
            className={"form-input-button button"}
            value={"Create Account"}
          >
            Create Account
          </button>
        </form>
      </div>
    </>
  );
};

export default NewAccountForm;
