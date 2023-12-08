import { useNavigate } from "react-router-dom";
import { getActionDisconnect } from "../store/reducers/userReducer"; // Ajustez le chemin d'importation en fonction de votre structure de projet
import "./Login.scss"; // Assurez-vous que le chemin vers le fichier SCSS est correct
import { useAppDispatch } from "../hooks/redux";

function Logout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loggedMessage = "You're connected.";

  const handleDisconnect = () => {
    localStorage.removeItem("token");
    dispatch(getActionDisconnect());
    navigate("/");
  };

  return (
    <div className="login-form">
      <div className="login-form-logged">
        <p className="login-form-message">{loggedMessage}</p>
        <button
          type="button"
          className="login-form-button"
          onClick={handleDisconnect}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Logout;
