import React from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

function SavedMovies({ savedMovies, foundSavedMovies, searchSavedFilms, onEmptySearch, deleteMovie }) {
 
  return (
    <>
      <main>
        <Header />
        <SearchForm
          onSubmitSearch={searchSavedFilms}
          onEmptySearch={onEmptySearch}
        />
        {savedMovies.length > 0 ? (
          <MoviesCardList
            isSavedPage={true}
            moviesArray={foundSavedMovies.length ? foundSavedMovies : savedMovies}
            onDeleteMovie={deleteMovie}
          />
        ) : (
          <p className="movies__no-results">Ничего не найдено</p>
        )}
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
