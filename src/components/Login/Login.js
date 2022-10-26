import logo from "../../images/logo.svg";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function Login({onLogin, loginOK}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLoginSubmit = ({ email, password }) => {
    onLogin(email, password);
  };

  return (
    <div className="authorization">
      <Link className="authorization__logo" to="/">
        <img className="logo" src={logo} alt="Логотип" />
      </Link>
      <h1 className="authorization__header">Рады видеть!</h1>
      <form
        className="authorization__form"
        onSubmit={handleSubmit(handleLoginSubmit)}
      >
        <p className="authorization__form_header">E-mail</p>
        <input
          className="authorization__form_input"
          type="email"
          name="email"
          placeholder="Введите e-mail"
          {...register("email", {
            required: true,
            pattern:
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
        ></input>
        <p className="authorization__form_header">Пароль</p>
        <input
          className="authorization__form_input"
          type="password"
          name="password"
          placeholder="Введите пароль"
          {...register("password", { required: true })}
        ></input>
        {(errors.email || errors.password) && (
          <p className="authorization__form_error">Одно из полей заполнено неверно</p>
        )}
        <p className={`authorization__form_error_final ${!loginOK && "authorization__form_error_final_visible"}`}>
          При входе произошла ошибка
        </p>
        <button className={`authorization__form_button ${(errors.email || errors.password) && "authorization__form_button_disabled"}`} type="submit">
          Войти
        </button>
      </form>
      <div className="authorization__redirect">
        <p className="authorization__redirect_text">Ещё не зарегистрированы?</p>
        <Link className="authorization__redirect_link" to="/signin">
          Регистрация
        </Link>
      </div>
    </div>
  );
}

export default Login;
