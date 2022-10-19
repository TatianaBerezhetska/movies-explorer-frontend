import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="authorization">
      <Link to="/"><img className="logo" src={logo} alt="Логотип"/></Link>
      <h1 className="authorization__header">Добро пожаловать!</h1>
      <form className="authorization__form">
        <p className="authorization__form_header">Имя</p>
        <input className="authorization__form_input" type="type" name="name" placeholder="Ваше имя"></input>
        <p className="authorization__form_header">E-mail</p>
        <input className="authorization__form_input" type="email" name="email" placeholder="Ваш e-mail"></input>
        <p className="authorization__form_header">Пароль</p>
        <input className="authorization__form_input" type="password" name="password" placeholder="Ваш пароль"></input>
        <p className="authorization__form_error">Что-то пошло не так...</p>
        <button className="authorization__form_button"type="submit">Зарегистрироваться</button>
      </form>
      <div className="authorization__redirect">
        <p className="authorization__redirect_text">Уже зарегистрированы?</p>
        <Link className="authorization__redirect_link" to="/signin">Войти</Link>
      </div>
    </div>
  );
}

export default Register;
