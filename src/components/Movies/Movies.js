import React, {useState, useEffect } from "react";

import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoreButton from "../MoreButton/MoreButton";
import Footer from "../Footer/Footer";
import "./Movies.css";

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
} from "../../utils/constants";

function Movies({ isLoading, savedMovies, filteredMovies, searchMovies, onEmptySearch, onSaveMovie, onDeleteMovie }) {

  const [renderedMovies, setRenderedMovies] = useState(JSON.parse(localStorage.getItem("renderedMovies")) || []);
  const [moviesCount, setMoviesCount] = useState(12);
  const [moviesMore, setMoviesMore] = useState(3);

  const { width } = useWindowDimensions();

  useEffect(() => {
    checkLocalStorage();
  }, []);

  useEffect(() => {
    setMovieslistParams();
  }, [width]);

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
    } else {
      setRenderedMovies([]);
    }
  }

  // фильмы по параметрам поиска
  const searchFilms = (searchQuery) => {
    setMovieslistParams();
    searchMovies(searchQuery); // в App
  };

  useEffect(() => {
    setRenderedMovies(filteredMovies.slice(0, moviesCount))
  }, [filteredMovies]);

  useEffect(() => {
    localStorage.setItem("renderedMovies", JSON.stringify(renderedMovies))
  }, [renderedMovies])

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
              savedFilms={savedMovies}
              onDeleteMovie={onDeleteMovie}
              onAddMovie={onSaveMovie}
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
