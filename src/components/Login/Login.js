import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="authorization">
      <Link className="authorization__logo" to="/"><img className="logo" src={logo} alt="Логотип"/></Link>
      <h1 className="authorization__header">Рады видеть!</h1>
      <form className="authorization__form">
        <p className="authorization__form_header">E-mail</p>
        <input className="authorization__form_input" type="email" name="email" placeholder="Введите e-mail"></input>
        <p className="authorization__form_header">Пароль</p>
        <input className="authorization__form_input" type="password" name="password" placeholder="Введите пароль"></input>
        <p className="authorization__form_error">Что-то пошло не так...</p>
        <button className="authorization__form_button" type="submit">Войти</button>
      </form>
      <div className="authorization__redirect">
        <p className="authorization__redirect_text">Ещё не зарегистрированы?</p>
        <Link className="authorization__redirect_link" to="/signin">Регистрация</Link>
      </div>
    </div>
  );
}

export default Login;
