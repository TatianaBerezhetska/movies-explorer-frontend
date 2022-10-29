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
import mainApi from "../../utils/MainApi";

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
        if (res.error) {
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
    console.log(name, email);
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
    setCurrentUser({});
    history.push("/");
  };

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
            onLoadingError={handleLoadingError}
            onEmptySearch={handleEmptySearch}
          />

          <ProtectedRoute
            path="/saved-movies"
            loggedIn={loggedIn}
            component={SavedMovies}
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
