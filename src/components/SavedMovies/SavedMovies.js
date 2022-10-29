import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import mainApi from "../../utils/MainApi";
import {shortFilmDuration} from "../../utils/constants";

function SavedMovies({ onEmptySearch }) {
  const [savedMovies, setSavedMovies] = useState([]);

  useEffect(() => {
    mainApi
      .getSavedMovies()
      .then((res) => {
        setSavedMovies(res);
      })
      .then((res) => {
        localStorage.setItem("savedMovies", JSON.stringify(res))
      })
      .catch((err) => {
        console.log("Ошибка при получении сохранённых фильмов");
      });
  }, []);

  const searchSavedFilms = (searchQuery, onlyShortFilms) => {
    setSavedMovies(
      savedMovies.filter((movie) =>
        onlyShortFilms
          ? (
            (movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) && movie.duration <= shortFilmDuration) ||
            (movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase()) && movie.duration <= shortFilmDuration)
          )
          : ((movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) && movie.duration > shortFilmDuration) ||
            (movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase()) && movie.duration > shortFilmDuration))
      )
    );
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
          onSubmitSearch={searchSavedFilms}
          onEmptySearch={onEmptySearch}
        />
        {savedMovies.length > 0 ? (
          <MoviesCardList
            isSavedPage={true}
            moviesArray={savedMovies}
            onDeleteMovie={deleteMovie}
          />
        ) : (
          <p className="movies__no-results">Ничего не найдено</p>
        )}
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
