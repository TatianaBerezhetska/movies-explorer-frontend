import { Link } from "react-router-dom";
import './Portfolio.css';
import arrowIcon from "../../../images/arrowIcon.svg";

function Portfolio() {
  return (
    <>
    <h4 className="potrfolio__heading">Портфолио</h4>
    <ul className="potrfolio">
      <li className="potrfolio__item">
        <Link className="link potrfolio__link" to={{pathname: "https://how-to-learn-beta.vercel.app/#"}} target="_blank">
          <p className="portfolio__text">Статичный сайт</p>
          <img className="potrfolio__icon" src={arrowIcon} alt="Стрелка" />
        </Link>
      </li>
      <li className="potrfolio__item">
        <Link className="link potrfolio__link" to={{pathname: "https://russian-travel-iota.vercel.app/"}} target="_blank">
          <p className="portfolio__text">Адаптивный сайт</p>
          <img className="potrfolio__icon" src={arrowIcon} alt="Стрелка" />
        </Link>
      </li>
      <li className="potrfolio__item">
        <Link className="link potrfolio__link" to={{pathname: "https://berezhetska.students.nomoredomains.sbs"}} target="_blank">
          <p className="portfolio__text">Одностраничное приложение</p>
          <img className="potrfolio__icon" src={arrowIcon} alt="Стрелка" />
        </Link>
      </li>
    </ul>
    </>
  );
}

export default Portfolio;