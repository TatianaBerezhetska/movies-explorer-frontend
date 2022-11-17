import { NavLink } from "react-router-dom";
import closeIcon from "../../images/closeIcon.svg";
import './NavTab.css';

function NavTab({isOpen, onClickClose}) {
  return (
    <div className={`navtab ${isOpen && "navtab_visible"}`}>
      <ul className="navtab__container">
        <button className="navtab__close" onClick={onClickClose}><img src={closeIcon} alt="Кнопка Закрыть" aria-label="Close"/></button>
        <NavLink className="navtab__link" to="/">Главная</NavLink>
        <NavLink className="navtab__link navtab__link_focus" to="/movies">Фильмы</NavLink>
        <NavLink className="navtab__link" to="/saved-movies">Сохранённые фильмы</NavLink>
        <NavLink className="navtab__link navtab__button" to="/profile">Аккаунт</NavLink>
      </ul>
    </div>
  )
}

export default NavTab;