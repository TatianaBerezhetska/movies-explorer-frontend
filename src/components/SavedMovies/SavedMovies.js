import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies() {

  const deleteMovie = () => {};

  return (
    <>
    <SearchForm />
    <MoviesCardList handleButtonClick={deleteMovie} />
    <Footer />
    </>
  );
}

export default SavedMovies;
