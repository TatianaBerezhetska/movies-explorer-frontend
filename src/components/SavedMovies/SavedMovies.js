import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import mainApi from "../../utils/MainApi";
import checkIncludeShortFilms from "../../utils/checkIncludeShortFilms";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import {
  desktopWidth,
  desktopMoviesCount,
  tabletWidth,
  tabletMoviesCount,
  mobileWidth,
  mobileMoviesCount,
} from "../../utils/constants";

function SavedMovies({
  includingShortFilms,
  onShortFilmsChange,
  onEmptySearch,
}) {

  const [savedMovies, setSavedMovies] = useState([]);
  const [foundMovies, setFoundMovies] = useState([]);
  const [moviesCount, setMoviesCount] = useState(12);

  useEffect(() => {
    mainApi
      .getSavedMovies()
      .then((res) => {
        setSavedMovies(res);
      })
      .catch((err) => {
        console.log("Ошибка при получении сохранённых фильмов");
      });
  }, []);

  const { width } = useWindowDimensions();

  const setMovieslistParams = () => {
    if (width >= desktopWidth) {
      setMoviesCount(desktopMoviesCount);
    } else if (width >= tabletWidth && width < desktopWidth) {
      setMoviesCount(tabletMoviesCount);
    } else if (width >= mobileWidth && width < tabletWidth) {
      setMoviesCount(mobileMoviesCount);
    }};

  const searchSavedFilms = (searchQuery) => {
    setMovieslistParams();
    const filteredMovies = savedMovies.filter(function (movie) {
      return (
        movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    console.log(filteredMovies)
    setFoundMovies(filteredMovies); // массив фильмов по результатам поиска

    if(!includingShortFilms) {
      setFoundMovies(checkIncludeShortFilms(foundMovies));
    }

    const renderedMovies = foundMovies.slice(0, moviesCount); // фильмы, которые будут отрисованы на странице
    
    setSavedMovies(renderedMovies);
  };

  const deleteMovie = (movie) => {
    mainApi
      .deleteMovie(movie)
      .then(() => {
        mainApi
          .getSavedMovies()
          .then((res) => {
            setSavedMovies(res);
          })
          .catch((err) => {
            console.log("Ошибка при обновлении сохранённых фильмов");
          });
      })
      .catch((err) => {
        console.log("Ошибка при удалении фильма");
      });
  };

  return (
    <>
      <main>
        <Header />
        <SearchForm
          includingShortFilms={includingShortFilms}
          onShortFilmsChange={onShortFilmsChange}
          onSubmitSearch={searchSavedFilms}
          onEmptySearch={onEmptySearch}
        />
        {savedMovies.length > 0 ? (<MoviesCardList
          isSavedPage={true}
          moviesArray={savedMovies}
          onDeleteMovie={deleteMovie}
        />) : <p className="movies__no-results">Ничего не найдено</p>}
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
