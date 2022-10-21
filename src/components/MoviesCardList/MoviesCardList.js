import { Route } from "react-router-dom";
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import moviesArray from '../../utils/MoviesArray';
import buttonTick from '../../images/savedButton.svg';
import buttonSave from '../../images/saveButton.svg';
import deleteButton from '../../images/deleteButton.svg';

function MoviesCardList({handleButtonClick}) {

  const savedMoviesArray = moviesArray.filter(function(movie) {
    return movie.owner === "thisUser";
  });

  return (
    <div className="movies-cardlist">
      <Route path="/movies">
      {moviesArray.map((movie) => {
        return (
          <MoviesCard
          key={movie.id}
          name={movie.nameRU}
          length={movie.duration}
          thumbnail={movie.image.url}
          buttonImg={movie.isSaved ? buttonTick : buttonSave}
          onButtonClick={handleButtonClick}
          />
        )
      })}
      </Route>
      <Route path="/saved-movies">
      {savedMoviesArray.map((movie) => {
        return (
          <MoviesCard
          key={movie.id}
          name={movie.nameRU}
          length={movie.duration}
          thumbnail={movie.image.url}
          buttonImg={deleteButton}
          onButtonClick={handleButtonClick}
          />
        )
      })}
      </Route>
    </div>
  );
}

export default MoviesCardList;