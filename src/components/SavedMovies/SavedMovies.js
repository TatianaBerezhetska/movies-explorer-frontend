import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies() {

  const deleteMovie = () => {};

  return (
    <>
    <main>
      <SearchForm />
      <MoviesCardList handleButtonClick={deleteMovie} />
    </main>
    <Footer />
    </>
  );
}

export default SavedMovies;
