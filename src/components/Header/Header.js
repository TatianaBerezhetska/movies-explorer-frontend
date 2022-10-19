import React, {useState} from "react";
import { Link, NavLink } from "react-router-dom";
import NavTab from "../NavTab/NavTab.js";
import "./Header.css";
import logo from "../../images/logo.svg";
import burgerIcon from "../../images/burgerIcon.svg";

function Header() {
  
const [navTabIsOpen, setNavTabIsOpen] = useState(false);

  const handleNavtabClick = () => {
    setNavTabIsOpen(true);
  };

  return (
    <>
      <section className="header">
        <Link to="/">
          <img className="logo" src={logo} alt="Логотип" />
        </Link>
        <ul className="header__links">
          <li>
            <NavLink className="link header__link bold-text" to="/movies">
              Фильмы
            </NavLink>
          </li>
          <li>
            <NavLink className="link header__link" to="/saved-movies">
              Сохранённые фильмы
            </NavLink>
          </li>
        </ul>
        <NavLink to="/profile">
          <button className="link header__profile-link">Аккаунт</button>
        </NavLink>
        <button className="header__navtab" onClick={handleNavtabClick}>
          <img src={burgerIcon} alt="Бургерное меню" />
        </button>
      </section>
      <NavTab />
    </>
  );
}

export default Header;
