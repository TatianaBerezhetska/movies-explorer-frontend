import React, { useState } from "react";
import { useLocation, Link, NavLink } from "react-router-dom";
import NavTab from "../NavTab/NavTab.js";
import "./Header.css";
import logo from "../../images/logo.svg";
import burgerIcon from "../../images/burgerIcon.svg";

function Header() {
  
  const location = useLocation();
  const [isNavTabOpen, setIsNavTabOpen] = useState(false);

  const handleNavtabClick = () => {
    setIsNavTabOpen(true);
  };

  const handleNavTabClose = () => {
    setIsNavTabOpen(false);
  };

  return (
    <>
      <section className={`header ${location.pathname === '/' && "header_pink"}`}>
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
      <NavTab isOpen={isNavTabOpen} onClickClose={handleNavTabClose} />
    </>
  );
}

export default Header;
