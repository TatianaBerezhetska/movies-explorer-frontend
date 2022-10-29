import './MoviesCard.css';
import deleteButton from '../../images/deleteButton.svg';

function SavedMoviesCard({movie, savedMovies, onDeleteMovie} ) {

  const deleteMovie = () => {
    const movieToDelete = savedMovies.find((i) => i._id === movie._id)
    onDeleteMovie(movieToDelete);
  }
  
  return (
    <div className="movies-card">
      <div className="movies-card__description">
        <p className="movies-card__name">{movie.nameRU}</p>
        <p className="movies-card__length">{movie.duration} минут</p>
      </div>
      <a href={movie.trailerLink} target="blank"><img
        className="movies-card__thumbnail"
        src={`https://api.nomoreparties.co${movie.image}`}
        alt="Предпросмотр фильма"
      /></a>
      <button
        className="movies-card__button"
        type="button"
        onClick={deleteMovie}
      >
        <img src={deleteButton} alt="Кнопка" />
      </button>
    </div>
  );
}

export default SavedMoviesCard;
