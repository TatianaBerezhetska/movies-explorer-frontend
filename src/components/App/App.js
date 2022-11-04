import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFound from "../NotFound/NotFound";
import ErrorPopup from "../ErrorPopup/ErrorPopup";
import "../../index.css";
import moviesApi from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";
import { shortFilmDuration } from "../../utils/constants";

function App() {
  const [loggedIn, setLoggedIn] = useState(() => {
    if (localStorage.getItem("token")) {
      return true;
    }
  });
  const [registrationOK, setRegistrationOK] = useState(true);
  const [loginOK, setLoginOK] = useState(true);
  const [profileStatusText, setProfileStatusText] = useState("");
  const [profileInfoColor, setProfileInfoColor] = useState("");

  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState(JSON.parse(localStorage.getItem("filteredMovies")) || []);
  const [savedMovies, setSavedMovies] = useState([]);
  const [foundSavedMovies, setFoundSavedMovies] = useState([]);

  const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);
  const [popupText, setPopupText] = useState("");

  const history = useHistory();

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      mainApi
      .getCurrentUser()
      .then((currentUser) => {
        setCurrentUser(currentUser);
      })
      .catch((err) => {
        console.log(`Ошибка при запросе данных пользователя`);
        setPopupText("Не удалось загрузить ваши данные");
        setIsErrorPopupOpen(true);
      });
    } 
  }, [loggedIn]);

  const handleLogin = (email, password) => {
    mainApi
      .login(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("token", res.token);
          return res;
        }
      })
      .then((res) => {
        if (!res.token) {
          setLoginOK(false);
        } else {
          mainApi
            .getCurrentUser()
            .then((currentUser) => {
              setCurrentUser(currentUser);
            })
            .catch((err) => {
              history.push("/signin");
              setLoginOK(false);
              console.log(`Ошибка при запросе данных пользователя`);
            });
        }
      })
      .then(() => {
        setLoggedIn(true);
        history.push("/movies");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRegistration = (name, email, password) => {
    mainApi
      .register(name, email, password)
      .then((res) => {
        if (res.message) {
          setRegistrationOK(false);
        } else {
          handleLogin(email, password);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditProfile = (name, email) => {
    mainApi
    .editProfile(name, email)
    .then((res) => {
      setCurrentUser(res);
      setProfileInfoColor("#C2C2C2");
      setProfileStatusText("Данные успешно обновлены");
    })
    .catch((err) => {
      if (err.status === 401) {
        console.log('Ошибка авторизации');
        handleLogOut();
      } else  {
        setProfileInfoColor("#FF4062");
        setProfileStatusText("При обновлении профиля произошла ошибка");
      }
    });
  };

  const handleLogOut = () => {
    localStorage.clear();
    setLoggedIn(false);
    setCurrentUser({});
    setMovies([]);
    setFilteredMovies([]);
    setSavedMovies([]);
    history.push("/");
  };

  //проверка токена при первой загрузке страницы
  const tokenCheck = () => {
    if (localStorage.getItem("token")) {
      setLoggedIn(true);
      const token = localStorage.getItem("token");
      if (token) {
        mainApi
          .getCurrentUser()
          .then((currentUser) => {
            setCurrentUser(currentUser);
          })
          .then(() => {
            setLoggedIn(true);
          })
          .catch((err) => {
            console.log(`Ошибка при запросе данных пользователя`);
          });
      }
    }
  };

  const enablePreloader = () => {
    setIsLoading(true);
  }

  const disablePreloader = () => {
    setIsLoading(false);
  }

  useEffect(() => {
    getAllFilms();
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      enablePreloader();
      mainApi
        .getSavedMovies()
        .then((res) => {
          setSavedMovies(res);
        })
        .then((res) => {
          localStorage.setItem("savedMovies", JSON.stringify(res))
        })
        .then(() => disablePreloader())
        .catch((err) => {
          console.log("Ошибка при получении сохранённых фильмов");
          setPopupText("Не удалось загрузить ваши фильмы. Попробуйте ещё раз.");
          setIsErrorPopupOpen(true);
        });
    }
  }, [loggedIn]);

    // все фильмы сервиса
  const getAllFilms = () => {
    enablePreloader();
    moviesApi
      .getMovies()
      .then((res) => {
        setMovies(res);
      })
      .then(() => disablePreloader())
      .catch((err) => {
        handleLoadingError();
      });
  };

  const searchMovies = (searchQuery) => {
    const onlyShortFilms = localStorage.getItem('onlyShortFilms');
    // console.log(onlyShortFilms)
    setFilteredMovies(
      movies.filter((movie) =>
        onlyShortFilms==='true' ? (
          (movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) && movie.duration <= shortFilmDuration) ||
          (movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase()) && movie.duration <= shortFilmDuration)
        ) : (
          (movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) && movie.duration > shortFilmDuration) ||
          (movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase()) && movie.duration > shortFilmDuration)
        )
      )
    )
    localStorage.setItem("searchQueryText", searchQuery);
  };

  useEffect(() => {
    localStorage.setItem("filteredMovies", JSON.stringify(filteredMovies))
  }, [filteredMovies])

  const searchSavedFilms = (searchQuery) => {
    const onlyShortFilms = localStorage.getItem('onlyShortFilms');
    setFoundSavedMovies(
      savedMovies.filter((movie) =>
        onlyShortFilms==='true'
          ? (
            (movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) && movie.duration <= shortFilmDuration) ||
            (movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase()) && movie.duration <= shortFilmDuration)
          )
          : ((movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) && movie.duration > shortFilmDuration) ||
            (movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase()) && movie.duration > shortFilmDuration))
      )
    );
  };

  const deleteSavedMovie = (movie) => {
    mainApi
      .deleteMovie(movie)
      .then(() => {
        mainApi
          .getSavedMovies()
          .then((res) => {
            setSavedMovies(res);
          })
          .catch((err) => {
            console.log("Ошибка при обновлении сохранённых фильмов");
          });
      })
      .catch((err) => {
        console.log("Ошибка при удалении фильма");
        setPopupText("Что-то пошло не так. Попробуйте ещё раз.");
        setIsErrorPopupOpen(true);
      });
  };

  const saveMovie = (movie) => {
    mainApi
    .saveMovie(movie)
    .then(() => {
      mainApi
      .getSavedMovies()
        .then((res) => {
          setSavedMovies(res);
        })
        .then((res) => {
          localStorage.setItem("savedMovies", JSON.stringify(res))
        })
    })
    .catch((err) => {
      if (err.status === 401) {
        console.log('Ошибка авторизации');
        handleLogOut();
      } else  {
        console.log('Ошибка при сохранении фильма');
        setPopupText("Что-то пошло не так. Попробуйте ещё раз.");
        setIsErrorPopupOpen(true);
      }
    })
  }

  const deleteMovie = (movie) => {
    mainApi
    .deleteMovie(movie)
    .then(() => {
      mainApi
      .getSavedMovies()
        .then((res) => {
          setSavedMovies(res);
        })
        .then((res) => {
          localStorage.setItem("savedMovies", JSON.stringify(res))
        })
    })
    .catch((err) => {
      if (err.status === 401) {
        console.log('Ошибка авторизации');
        handleLogOut();
      } else  {
        console.log('Ошибка при удалении фильма');
        setPopupText("Что-то пошло не так. Попробуйте ещё раз.");
        setIsErrorPopupOpen(true);
      }
    })
  }

  const handleLoadingError = () => {
    setPopupText(
      "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
    );
    setIsErrorPopupOpen(true);
  };

  const handleEmptySearch = () => {
    setPopupText("Нужно ввести ключевое слово");
    setIsErrorPopupOpen(true);
  };

  const handleErrorPopupClose = () => {
    setIsErrorPopupOpen(false);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Main loggedIn={loggedIn} />
          </Route>

          <ProtectedRoute
            path="/movies"
            loggedIn={loggedIn}
            component={Movies}
            savedMovies={savedMovies}
            filteredMovies={filteredMovies}
            searchMovies= {searchMovies}
            onLoadingError={handleLoadingError}
            onEmptySearch={handleEmptySearch}
            onSaveMovie={saveMovie}
            onDeleteMovie={deleteMovie}
          />

          <ProtectedRoute
            path="/saved-movies"
            loggedIn={loggedIn}
            component={SavedMovies}
            savedMovies={savedMovies}
            foundSavedMovies={foundSavedMovies}
            searchSavedFilms={searchSavedFilms}
            isLoading={isLoading}
            onEmptySearch={handleEmptySearch}
            deleteMovie={deleteSavedMovie}
          />

          <ProtectedRoute
            path="/profile"
            loggedIn={loggedIn}
            component={Profile}
            onEditProfile={handleEditProfile}
            statusText={profileStatusText}
            infoColor={profileInfoColor}
            onLogOut={handleLogOut}
          />

          <Route path="/signin">
            {!loggedIn ? (
              <Login onLogin={handleLogin} loginOK={loginOK} />
            ) : (
              <Redirect to="/profile" />
            )}
          </Route>

          <Route path="/signup">
            {!loggedIn ? (
              <Register
                onRegistration={handleRegistration}
                registrationOK={registrationOK}
              />
            ) : (
              <Redirect to="/profile" />
            )}
          </Route>

          <Route path="*">
            <NotFound />
          </Route>
        </Switch>

        <ErrorPopup
          text={popupText}
          isOpen={isErrorPopupOpen}
          onClose={handleErrorPopupClose}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
