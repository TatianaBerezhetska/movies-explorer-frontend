import React from "react";
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import SavedMoviesCard from '../MoviesCard/SavedMoviesCard';

function MoviesCardList({isSavedPage, moviesArray, savedFilms, onDeleteMovie, onAddMovie}) {

  return (
    <div className="movies-cardlist">
      {isSavedPage ? (
        moviesArray.map((movie) => {
          return (
            <SavedMoviesCard
            movie={movie}
            key={movie._id}
            savedMovies={moviesArray}
            onDeleteMovie={onDeleteMovie}
            />
          )
        })
      ) : (moviesArray.map((movie) => {
        return (
          <MoviesCard
          movie={movie}
          key={movie.id}
          savedFilms={savedFilms}
          onDeleteMovie={onDeleteMovie}
          onAddMovie={onAddMovie}
          />
        )
      }))}
    </div>
  );
}

export default MoviesCardList;