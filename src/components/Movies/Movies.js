import React, { useContext, useState, useEffect } from "react";

import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoreButton from "../MoreButton/MoreButton";
import Footer from "../Footer/Footer";
import "./Movies.css";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

import moviesApi from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import {
  desktopWidth,
  desktopMoviesCount,
  desktopMoviesMore,
  tabletWidth,
  tabletMoviesCount,
  tabletMoviesMore,
  mobileWidth,
  mobileMoviesCount,
  mobileMoviesMore,
  shortFilmDuration,
} from "../../utils/constants";

function Movies({ onLoadingError, onEmptySearch }) {

  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [renderedMovies, setRenderedMovies] = useState([]);
  const [moviesCount, setMoviesCount] = useState(12);
  const [moviesMore, setMoviesMore] = useState(3);
  const [isLoading, setIsLoading] = useState(false);

  const { width } = useWindowDimensions();

  useEffect(() => {
    checkLocalStorage();
  }, []);

  useEffect(() => {
    setMovieslistParams();
  }, [width]);

  useEffect(() => {
    getAllFilms();
  }, []);

  const setMovieslistParams = () => {
  if (width >= desktopWidth) {
    setMoviesCount(desktopMoviesCount);
    setMoviesMore(desktopMoviesMore);
  } else if (width >= tabletWidth && width < desktopWidth) {
    setMoviesCount(tabletMoviesCount);
    setMoviesMore(tabletMoviesMore);
  } else if (width >= mobileWidth && width < tabletWidth) {
    setMoviesCount(mobileMoviesCount);
    setMoviesMore(mobileMoviesMore);
  }};

  const checkLocalStorage = () => {
    if (localStorage.getItem("renderedMovies")) {
      setRenderedMovies(JSON.parse(localStorage.getItem("renderedMovies")));
    }
  }

  // все фильмы сервиса
  const getAllFilms = () => {
    moviesApi
      .getMovies()
      .then((res) => setMovies(res))
      .catch((err) => {
        onLoadingError();
      });
  };

  // фильмы по параметрам поиска
  const searchFilms = (searchQuery, onlyShortFilms) => {
    setMovieslistParams();
    setIsLoading(true);
    setFilteredMovies(
      movies.filter((movie) =>
        onlyShortFilms ? (
          (movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) && movie.duration <= shortFilmDuration) ||
          (movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase()) && movie.duration <= shortFilmDuration)
        ) : (
          (movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) && movie.duration > shortFilmDuration) ||
          (movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase()) && movie.duration > shortFilmDuration)
        )
      )
    )
    setIsLoading(false);
    saveSearchParams(searchQuery, renderedMovies);
  };

  useEffect(() => {
    setRenderedMovies(filteredMovies.slice(0, moviesCount));
  }, [filteredMovies]);

  const saveSearchParams = (text, movies) => {
    localStorage.setItem("searchQueryText", text);
    localStorage.setItem("renderedMovies", JSON.stringify(movies));
  };

  const saveMovie = (movie) => {
    mainApi
    .saveMovie(movie)
    .catch((err) => {
      console.log('Ошибка при сохранении фильма');
    })
  };

  const deleteMovie = (movie) => {
    mainApi
    .deleteMovie(movie)
    .catch((err) => {
      console.log('Ошибка при удалении фильма');
    })
  };

  const loadMore = () => {
    const [...moreMovies] = filteredMovies.slice(
      renderedMovies.length,
      renderedMovies.length + moviesMore
    );
    setRenderedMovies(renderedMovies.concat(...moreMovies));
  };

  return (
    <>
      <main>
        <Header />
        <SearchForm
          onSubmitSearch={searchFilms}
          onEmptySearch={onEmptySearch}
        />
        {isLoading ? (
          <Preloader />
        ) : (filteredMovies.length > 0 || renderedMovies.length > 0 ? (
          <>
            <MoviesCardList
              moviesArray={renderedMovies}
              onDeleteMovie={deleteMovie}
              onAddMovie={saveMovie}
            />
            {filteredMovies.length > renderedMovies.length && (
              <MoreButton onMoreButton={loadMore} />
            )}
          </>
        ) : (
          <p className="movies__no-results">Ничего не найдено</p>
        ))}
      </main>
      <Footer />
    </>
  );
}

export default Movies;
