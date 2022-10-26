import "./Profile.css";
import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import Header from "../Header/Header";

function Profile({ onEditProfile, statusText, infoColor, onLogOut }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleEditProfile = ({ name, email }) => {
    if (currentUser.name !== name || currentUser.email !== email) {
      onEditProfile(name, email);
    }
  };

  return (
    <>
      <Header />
      <section className="profile">
        <h2 className="profile__greeting">Привет, {currentUser.name}!</h2>
        <form
          className="profile__userdata"
          onSubmit={handleSubmit(handleEditProfile)}
        >
          <p className="profile__data bold-text">Имя</p>
          <input
            className="profile__data profile__data_input"
            value={name || ""}
            name="name"
            {...register("name", {
              required: true,
              minLength: 2,
              maxLength: 30,
              pattern: "[A-Za-zА-яа-я- ]+",
            })}
            onChange={handleNameChange}
          ></input>
          <p className="profile__data profile__data_noborder bold-text">
            E-mail
          </p>
          <input
            className="profile__data profile__data_input"
            value={email || ""}
            name="email"
            {...register("email", {
              required: true,
              pattern:
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            onChange={handleEmailChange}
          ></input>
          {errors.name || errors.email ? (
            <p className="profile__info" style={{ color: "#FF4062" }}>
              При обновлении профиля произошла ошибка
            </p>
          ) : (
            <p className="profile__info" style={{ color: infoColor }}>
              {statusText}
            </p>
          )}
          <button
            className={`profile__edit ${
              !(errors.name || errors.email) && "profile__edit_abled"
            }`}
            type="submit"
          >
            Редактировать
          </button>
          <button className="profile__logout" type="button" onClick={onLogOut}>
            Выйти из аккаунта
          </button>
        </form>
      </section>
    </>
  );
}

export default Profile;
