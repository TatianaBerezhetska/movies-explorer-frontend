import React from "react";
import { Link } from "react-router-dom";
import './Promo.css';
import logo from "../../../images/logo.svg";
import logo_globe from "../../../images/landing-logo-globe.svg";

function Promo() {
  return (
    <div className="Promo">
      <div className="promo__navigation">
        <img className="logo" src={logo} alt="Логотип"/>
        <ul className="promo__authorization">
          <li>
            <Link to="/signup"><button className="link promo__authorization_link">Регистрация</button></Link>
          </li>
          <li>
            <Link to="/signin"><button  className="link promo__authorization_link promo__authorization_button">Войти</button></Link>
          </li>
        </ul>
      </div>
      <div className="promo__description">
        <h1 className="promo__header">Учебный проект студента факультета Веб-разработки.</h1>
        <p className="promo__direction">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        <img className="promo__picture" src={logo_globe} alt="Глобус из слов"/>
        <Link to="#about-project"><button className="promo__button" type="button">Узнать больше</button></Link>
      </div>
    </div>
  );
}

export default Promo;