import React from "react";
import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="section about-project" id="about-project">
      <div className="section__header-container">
        <h2 className="section__header">О проекте</h2>
      </div>
      <div className="about-project__description">
        <div className="about-project__description_item">
          <p className="about-project__description_heading">
            Дипломный проект включал 5 этапов
          </p>
          <p className="about-project__description_text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="about-project__description_item">
          <p className="about-project__description_heading">
            На выполнение диплома ушло 5 недель
          </p>
          <p className="about-project__description_text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about-project__timeline">
        <div className="about-project__timeline_short">1 неделя</div>
        <div className="about-project__timeline_long">4 недели</div>
        <div className="about-project__timeline_description">Back-end</div>
        <div className="about-project__timeline_description">Front-end</div>
      </div>
    </section>
  );
}

export default AboutProject;
