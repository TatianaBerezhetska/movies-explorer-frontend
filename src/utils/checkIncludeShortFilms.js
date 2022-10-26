const shortFilmDuration = 40;

export default function checkIncludeShortFilms(movies) {
  const longFilms= movies.filter(function (movie) {
    return (
      movie.duration > shortFilmDuration
    );
  });
  return longFilms;
}