import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/login.css";
import login from "../../api/login";
import { useAppDispatch } from "../../hooks/redux";
import { getActionLogin } from "../../store/reducers/userReducer";
import UnopDropdown from "unop-react-dropdown";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");

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

    try {
      const response = await login(email, password);
      const {
        token,
        refresh_token,
        data: { id, first_name, last_name },
      } = response;
      dispatch(
        getActionLogin({
          token,
          refresh_token,
          id,
          first_name,
          last_name,
        })
      );
      navigate("/");
    } catch (error) {
      setError("Invalid credentials");
      console.log(error);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <>
      <div className="wrapper">
        {/* // todo change or rewrite this dropdown manually */}
        <UnopDropdown
          trigger={
            <button className="connect-button">
              <div className="connect-button-2">Connect</div>
            </button>
          }
          align="CENTER"
          delay={100}
        >
          <div className="dropdown-container">
            <form onSubmit={handleLogin}>
              <div className="input-container">
                <input
                  type="text"
                  className="settings-input"
                  placeholder="E-mail address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="error-wrapper">
                  <label className="error-label">{emailError}</label>
                </div>
              </div>
              <br />
              <div className="input-container">
                <input
                  type="password"
                  className="settings-input"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="error-wrapper">
                  <label className="error-label">{passwordError}</label>
                </div>
              </div>
              <br />
              <div className="input-container">
                <button
                  type="submit"
                  className={"input-button button"}
                  value={"Log in"}
                >
                  Login
                </button>
                <div className="error-wrapper">
                  <label className="error-label">{error}</label>
                </div>
              </div>
            </form>
          </div>
        </UnopDropdown>
      </div>
    </>
  );
};

export default Login;
