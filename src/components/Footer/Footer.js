import React from "react";
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__text-container">
        <h2 className="footer__main-text">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      </div>
    <div className="footer__nav">
      <h3 className="footer__link">© 2022</h3>
      <ul className="footer__links">
        <li className="footer__link">
          Яндекс.Практикум
        </li>
        <li className="footer__link">
          Github
        </li>
      </ul>
    </div>
    </footer>
  );
}

export default Footer;
