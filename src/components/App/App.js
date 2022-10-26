import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
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
import mainApi from "../../utils/MainApi";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [registrationOK, setRegistrationOK] = useState(true);
  const [loginOK, setLoginOK] = useState(true);
  const [profileStatusText, setProfileStatusText] = useState("");
  const [profileInfoColor, setProfileInfoColor] = useState("");

  const [currentUser, setCurrentUser] = useState({});

  const [includingShortFilms, setIncludingShortFilms] = useState(
    JSON.parse(localStorage.getItem("includingShortFilms"))
  );

  const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);
  const [popupText, setPopupText] = useState("");

  const history = useHistory();

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    mainApi
      .getCurrentUser()
      .then((currentUser) => {
        setCurrentUser(currentUser);
      })
      .catch((err) => {
        console.log(`Ошибка при запросе данных пользователя`);
      });
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
        if (res.token) {
          setLoggedIn(true);
          mainApi
            .getCurrentUser()
            .then((currentUser) => {
              setCurrentUser(currentUser);
            })
            .catch((err) => {
              console.log(`Ошибка при запросе данных пользователя`);
            });
          history.push("/movies");
        }
      })
      .catch((err) => {
        setLoginOK(false);
        console.log(err);
      });
  };

  const handleRegistration = (name, email, password) => {
    mainApi
      .register(name, email, password)
      .then((res) => {
        if (res.ok) {
          handleLogin(email, password);
        }
      })
      .catch((err) => {
        setRegistrationOK(false);
        console.log(err);
      });
  };

  const handleEditProfile = (name, email) => {
    console.log(name, email)
    mainApi
      .editProfile(name, email)
      .then((res) => {
        setCurrentUser(res);
        setProfileInfoColor("#C2C2C2");
        setProfileStatusText("Данные успешно обновлены");
      })
      .catch(() => {
        setProfileInfoColor("#FF4062");
        setProfileStatusText("При обновлении профиля произошла ошибка");
      });
  };

  const handleLogOut = () => {
    localStorage.clear();
    setLoggedIn(false);
    history.push("/");
  };

  const tokenCheck = () => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      if (token) {
        mainApi
          .getCurrentUser()
          .then((currentUser) => {
            setLoggedIn(true);
            setCurrentUser(currentUser);
            history.push("/");
          })
          .catch((err) => {
            console.log(`Ошибка при запросе данных пользователя`);
          });
      }
    }
  }

  const handleShortFilmsChange = () => {
    if (includingShortFilms) {
      setIncludingShortFilms(false);
    } else {
      setIncludingShortFilms(true);
    }
  };

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
            includingShortFilms={includingShortFilms}
            onShortFilmsChange={handleShortFilmsChange}
            onLoadingError={handleLoadingError}
            onEmptySearch={handleEmptySearch}
          />

          <ProtectedRoute
            path="/saved-movies"
            loggedIn={loggedIn}
            component={SavedMovies}
            includingShortFilms={includingShortFilms}
            onShortFilmsChange={handleShortFilmsChange}
            onEmptySearch={handleEmptySearch}
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
            <Login onLogin={handleLogin} loginOK={loginOK} />
          </Route>

          <Route path="/signup">
            <Register
              onRegistration={handleRegistration}
              registrationOK={registrationOK}
            />
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
