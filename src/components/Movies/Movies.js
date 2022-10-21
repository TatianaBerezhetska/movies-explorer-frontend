import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoreButton from '../MoreButton/MoreButton';
import Footer from '../Footer/Footer';

function Movies() {

  const saveMovie = () => {};
  const loadMore = () => {};

  return (
    <>
    <main>
      <SearchForm />
      <MoviesCardList handleButtonClick={saveMovie} />
      <MoreButton onClick={loadMore} />
    </main>
    <Footer />
    </>
  );
}

export default Movies;