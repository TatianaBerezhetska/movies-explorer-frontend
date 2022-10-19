import React, { useState } from "react";
import './SearchForm.css';
import searchIcon from "../../images/search-icon.svg";
import toggleIconOn from "../../images/smalltumbON.svg";
import toggleIconOff from "../../images/smalltumbOFF.svg";

function SearchForm() {

  const [includeShortFilms, setIncludeShortFilms] = useState(true);

  const toggleButton = () => {
    if(includeShortFilms) {
      setIncludeShortFilms(false);
    } else {
      setIncludeShortFilms(true);
    }
  };

  return (
    <div className="search-form">
      <form className="search-form__form">
        <input className="search-form__input" type="type" placeholder="Фильм"></input>
        <button className="search-form__submit" type="submit">
          <img src={searchIcon} alt="Поиск" />
        </button>
      </form>
      <button
        className="search-form__toggle"
        type="button"
        onClick={toggleButton}
      >
        <img src={includeShortFilms ? toggleIconOn : toggleIconOff} alt="Отображать короткометражки" />
        Короткометражки
      </button>
    </div>
  );
}

export default SearchForm;
