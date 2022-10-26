import React, { useState, useEffect } from "react";
import './MoviesCard.css';
import buttonTick from '../../images/savedButton.svg';
import buttonSave from '../../images/saveButton.svg';
import mainApi from "../../utils/MainApi";

function MoviesCard({movie, onDeleteMovie, onAddMovie} ) {

  const [savedFilms, setSavedFilms] = useState([]);

  const checkSavedFilms = () => {
    mainApi
    .getSavedMovies()
    .then((res) => {
      setSavedFilms(res);
    })
    .catch((err) => console.log(err));
  }

  useEffect(() => {
    checkSavedFilms();
  }, [savedFilms]);

  const isSaved = savedFilms.some((i) => i.movieId === movie.id);
  
  const deleteMovie = () => {
    const movieToDelete = savedFilms.find((i) => i.movieId === movie.id)
    onDeleteMovie(movieToDelete);
  }

  const addMovie = () => {
    onAddMovie(movie);
  }

  return (
    <div className="movies-card">
      <div className="movies-card__description">
        <p className="movies-card__name">{movie.nameRU}</p>
        <p className="movies-card__length">{movie.duration} минут</p>
      </div>
      <a href={movie.trailerLink} target="blank"><img
        className="movies-card__thumbnail"
        src={`https://api.nomoreparties.co${movie.image.url}`}
        alt="Предпросмотр фильма"
      /></a>
      <button
        className="movies-card__button"
        type="button"
        onClick={isSaved ? deleteMovie : addMovie}
      >
        <img src={isSaved ? buttonTick : buttonSave} alt="Кнопка" />
      </button>
    </div>
  );
}

export default MoviesCard;
