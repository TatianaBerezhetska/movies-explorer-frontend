import React from "react";
import { Link } from "react-router-dom";
import './AboutMe.css';
import photo from "../../../images/photo.jpg";

function AboutMe() {

  return (
  <section className="about-me">
    <div className="section__header-container">
      <h2 className="section__header">Студент</h2>
    </div>
    <article className="about-me__description">
      <h3 className="about-me__description_header">Татьяна</h3>
      <p className="about-me__description_text">Фронтенд-разработчик, 30 лет</p>
      <p className="about-me__description_bio">Я родилась в г. Ижевске, Удмуртская республика. Окончила ИжГТУ по специальности "Перевод и переводоведение (английский язык)" с красным дипломом. Потом переехала в Москву, сейчас живу в Приморском крае. Люблю читать детективы и историческую публицистику, регулярно занимаюсь силовыми тренировками. Когда начинаю кодить, забываю поесть.</p>
      <Link className="link about-me__description_github" to={{pathname: "https://github.com/TatianaBerezhetska"}} target="_blank">Github</Link>
      <img className="about-me__description_photo" src={photo} alt="Фото автора проекта" />
    </article>
  </section>
  );
}

export default AboutMe;