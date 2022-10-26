import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import "./LoggedOutHeader.css";

function LoggedOutHeader() {
  return (
    <div className="loggedoutheader">
        <img className="logo" src={logo} alt="Логотип"/>
        <ul className="loggedoutheader__authorization">
          <li>
            <Link to="/signup"><button className="link loggedoutheader__authorization_link">Регистрация</button></Link>
          </li>
          <li>
            <Link to="/signin"><button  className="link loggedoutheader__authorization_link loggedoutheader__authorization_button">Войти</button></Link>
          </li>
        </ul>
      </div>
  )
}

export default LoggedOutHeader;