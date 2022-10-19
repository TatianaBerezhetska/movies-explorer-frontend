import { Link } from "react-router-dom";
import './Portfolio.css';
import arrowIcon from "../../../images/arrowIcon.svg";

function Portfolio() {
  return (
    <ul className="potrfolio">
      <h4 className="potrfolio__heading">Портфолио</h4>
      <li className="potrfolio__item">
        <Link className="link potrfolio__link" to={{pathname: "https://how-to-learn-beta.vercel.app/#"}} target="_blank">Статичный сайт</Link>
        <img className="potrfolio__icon" src={arrowIcon} alt="Стрелка" />
      </li>
      <li className="potrfolio__item">
        <Link className="link potrfolio__link" to={{pathname: "https://russian-travel-iota.vercel.app/"}} target="_blank">Адаптивный сайт</Link>
        <img className="potrfolio__icon" src={arrowIcon} alt="Стрелка" />
      </li>
      <li className="potrfolio__item">
        <Link className="link potrfolio__link" to={{pathname: "https://berezhetska.students.nomoredomains.sbs"}} target="_blank">Одностраничное приложение</Link>
        <img className="potrfolio__icon" src={arrowIcon} alt="Стрелка" />
      </li>
    </ul>
  );
}

export default Portfolio;