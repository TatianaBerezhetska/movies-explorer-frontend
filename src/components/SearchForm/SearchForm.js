import React, { useState, useEffect } from "react";
import "./SearchForm.css";
import searchIcon from "../../images/search-icon.svg";
import toggleIconOn from "../../images/smalltumbON.svg";
import toggleIconOff from "../../images/smalltumbOFF.svg";

function SearchForm({ onSubmitSearch, onEmptySearch }) {
  const [searchInput, setSearchInput] = useState("");
  const [onlyShortFilms, setOnlyShortFilms] = useState(false);

  const checkLocalStorage = () => {
    if (localStorage.getItem('searchQueryText')) {
      setSearchInput(localStorage.getItem('searchQueryText'));
    };
    if (localStorage.getItem(onlyShortFilms)) {
      setOnlyShortFilms(Boolean(localStorage.getItem(onlyShortFilms)));
    };
  }

  useEffect(() => {
    checkLocalStorage();
  }, []);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleShortFilmsChange = () => {
    const value = !onlyShortFilms;
    setOnlyShortFilms(value);
    onSubmitSearch(searchInput, value);
    
    localStorage.setItem('onlyShortFilms', JSON.stringify(value));
  }

  const handleMoviesSearch = (e) => {
    e.preventDefault();
    if (searchInput.length > 0) {
      onSubmitSearch(searchInput);
    } else {
      onEmptySearch();
    };
  }

  return (
    <div className="search-form">
      <form className="search-form__form" onSubmit={handleMoviesSearch}>
        <input
          className="search-form__input"
          type="type"
          placeholder="Фильм"
          required
          value={searchInput || ""}
          onChange={handleSearchChange}
        ></input>
        <button className="search-form__submit" type="submit">
          <img src={searchIcon} alt="Поиск" />
        </button>
      </form>
      <button
        className="search-form__toggle"
        type="button"
        onClick={handleShortFilmsChange}
      >
        <img
          src={onlyShortFilms ? toggleIconOn : toggleIconOff}
          alt="Отображать короткометражки"
        />
        Короткометражки
      </button>
    </div>
  );
}

export default SearchForm;
