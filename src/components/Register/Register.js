import logo from "../../images/logo.svg";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function Register({onRegistration, registrationOK}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const handleRegistrationSubmit = ({name, email, password}) => {
    onRegistration(name, email, password);
  };

  return (
    <div className="authorization">
      <Link className="authorization__logo" to="/">
        <img className="logo" src={logo} alt="Логотип" />
      </Link>
      <h1 className="authorization__header">Добро пожаловать!</h1>
      <form
        className="authorization__form"
        onSubmit={handleSubmit(handleRegistrationSubmit)}
      >
        <p className="authorization__form_header">Имя</p>
        <input
          className="authorization__form_input input"
          type="type"
          name="name"
          placeholder="Ваше имя"
          {...register("name", { required: true, minLength: 2, maxLength: 30, pattern: '[A-Za-zА-яа-я- ]+' })}
        ></input>
        {errors.name && (
          <p className="authorization__form_error">
            Это поле обязательное. Имя может содержать русские и латинские
            буквы, дефис, пробел.
          </p>
        )}
        <p className="authorization__form_header">E-mail</p>
        <input
          className="authorization__form_input input"
          type="email"
          name="email"
          placeholder="Ваш e-mail"
          {...register("email", {
            required: true,
            pattern:
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
        ></input>
        {errors.email && (
          <p className="authorization__form_error">
            Неверный формат электронной почты
          </p>
        )}
        <p className="authorization__form_header">Пароль</p>
        <input
          className="authorization__form_input input"
          type="password"
          name="password"
          placeholder="Ваш пароль"
          {...register("password", { required: true })}
        ></input>
        {errors.password && (
          <p className="authorization__form_error">Что-то пошло не так...</p>
        )}
        <p className={`authorization__form_error_final ${!registrationOK && "authorization__form_error_final_visible"}`}>
          При регистрации произошла ошибка
        </p>
        <button className={`authorization__form_button ${(errors.name || errors.email || errors.password) && "authorization__form_button_disabled"}`} type="submit">
          Зарегистрироваться
        </button>
      </form>
      <div className="authorization__redirect">
        <p className="authorization__redirect_text">Уже зарегистрированы?</p>
        <Link className="authorization__redirect_link" to="/signin">
          Войти
        </Link>
      </div>
    </div>
  );
}

export default Register;
