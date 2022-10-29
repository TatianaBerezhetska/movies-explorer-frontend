import React from "react";
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import SavedMoviesCard from '../MoviesCard/SavedMoviesCard';

function MoviesCardList({isSavedPage, moviesArray, onDeleteMovie, onAddMovie}) {

  return (
    <div className="movies-cardlist">
      {isSavedPage ? (
        moviesArray.map((movie) => {
          console.log('cardlist saved page +')

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
        console.log('cardlist saved page -')

        return (
          <MoviesCard
          movie={movie}
          key={movie.id}
          onDeleteMovie={onDeleteMovie}
          onAddMovie={onAddMovie}
          />
        )
      }))}
    </div>
  );
}

export default MoviesCardList;