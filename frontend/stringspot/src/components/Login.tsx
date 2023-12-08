import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import login from "../api/login";
import { useAppDispatch } from "../hooks/redux";
import { getActionLogin } from "../store/reducers/userReducer";
import UnopDropdown from "unop-react-dropdown";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // TODO handle account verification
  //     checkAccountExists((accountExists) => {
  //       if (accountExists) {
  //         login();
  //       } else {
  //         if (
  //           window.confirm(
  //             "An account does not exist with this e-mail address: " +
  //               email +
  //               ". Do you want to create a new account?"
  //           )
  //         ) {
  //           login();
  //         }
  //       }
  //     });
  //   }

  //   const checkAccountExists = () => {
  //   }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");

    if ("" === email) {
      setEmailError("Please enter your e-mail address");
      return;
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("Please enter a valid email");
      return;
    }

    if ("" === password) {
      setPasswordError("Please enter a password");
      return;
    }

    try {
      const response = await login(email, password);
      const {
        token,
        data: { id, name, roles },
      } = response;
      dispatch(getActionLogin({ token, id, name, roles }));
      navigate("/");
    } catch (error) {
      setError("Invalid credentials");
    }
  };

  return (
    <>
      <div className="wrapper">
        // todo change or rewrite this dropdown manually
        <UnopDropdown
          trigger={
            <button className="connect-button button-dark">Connect</button>
          }
          align="CENTER"
          delay={100}
        >
          <div className="dropdown-container">
            {/* <form action=""> */}
            <form onSubmit={handleLogin}>
              <div className="input-container">
                <input
                  type="text"
                  className="settings-input"
                  placeholder="E-mail address"
                  value={email} // control en lecture : on affiche la donnée de redux
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label className="error-label">{emailError}</label>
              </div>
              <br />
              <div className="input-container">
                <input
                  type="password"
                  className="settings-input"
                  placeholder="Password"
                  value={password} // control en lecture : on affiche la donnée de redux
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label className="error-label">{passwordError}</label>
              </div>
              <br />
              <div className="input-container">
                <button
                  type="submit"
                  className={"input-button button-dark"}
                  value={"Log in"}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
          <div className="invalid-error">
            {error && <p className="error-message">{error}</p>}
          </div>
        </UnopDropdown>
      </div>
    </>
  );
};

export default Login;
