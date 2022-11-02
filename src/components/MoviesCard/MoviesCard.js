import React, { useState } from "react";
import './MoviesCard.css';
import buttonTick from '../../images/savedButton.svg';
import buttonSave from '../../images/saveButton.svg';

function MoviesCard({movie, savedFilms, onDeleteMovie, onAddMovie} ) {

  const [isSaved, setIsSaved] = useState(() => 
    savedFilms.some((i) => i.movieId === movie.id))

  const deleteMovie = () => {
    const movieToDelete = savedFilms.find((i) => i.movieId === movie.id)
    setIsSaved(false);
    onDeleteMovie(movieToDelete);
  }

  const addMovie = () => {
    setIsSaved(true);
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
