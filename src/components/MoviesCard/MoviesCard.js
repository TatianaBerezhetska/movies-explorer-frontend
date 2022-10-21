import './MoviesCard.css';

function MoviesCard({ name, length, thumbnail, buttonImg, onButtonClick }) {
  return (
    <div className="movies-card">
      <div className="movies-card__description">
        <p className="movies-card__name">{name}</p>
        <p className="movies-card__length">{length} минут</p>
      </div>
      <img
        className="movies-card__thumbnail"
        src={`https://api.nomoreparties.co/${thumbnail}`}
        alt="Предпросмотр фильма"
      />
      <button
        className="movies-card__button"
        type="button"
        onClick={onButtonClick}
      >
        <img src={buttonImg} alt="Кнопка" />
      </button>
    </div>
  );
}

export default MoviesCard;
