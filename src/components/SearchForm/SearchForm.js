import React, { useState, useEffect } from "react";
import "./SearchForm.css";
import searchIcon from "../../images/search-icon.svg";
import toggleIconOn from "../../images/smalltumbON.svg";
import toggleIconOff from "../../images/smalltumbOFF.svg";

function SearchForm({includingShortFilms, onShortFilmsChange, onSubmitSearch, onEmptySearch}) {
  const [searchInput, setSearchInput] = useState("");

  const checkLocalStorage = () => {
    if (localStorage.getItem('searchQueryText')) {
      setSearchInput(localStorage.getItem('searchQueryText'));
    };
    // check short film, too
  }

  useEffect(() => {
    checkLocalStorage();
  }, []);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

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
      <form className="search-form__form">
        <input
          className="search-form__input"
          type="type"
          placeholder="Фильм"
          required
          value={searchInput || ""}
          onChange={handleSearchChange}
        ></input>
        <button className="search-form__submit" type="submit" onClick={handleMoviesSearch}>
          <img src={searchIcon} alt="Поиск" />
        </button>
      </form>
      <button
        className="search-form__toggle"
        type="button"
        onClick={onShortFilmsChange}
      >
        <img
          src={includingShortFilms ? toggleIconOn : toggleIconOff}
          alt="Отображать короткометражки"
        />
        Короткометражки
      </button>
    </div>
  );
}

export default SearchForm;
