import { useNavigate } from "react-router-dom";
import { getActionDisconnect } from "../store/reducers/userReducer";
import "../styles/logged.css";
import { useAppDispatch } from "../hooks/redux";

function Logout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onHomepage = location.pathname === "/";

  const handleDisconnect = () => {
    localStorage.removeItem("token");
    dispatch(getActionDisconnect());
    if (!onHomepage) {
      navigate("/");
    }
  };

  return (
    <li className="item-wrapper">
      <a href="#" onClick={handleDisconnect} className="logout-link">
        Logout
      </a>
    </li>
  );
}

export default Logout;
