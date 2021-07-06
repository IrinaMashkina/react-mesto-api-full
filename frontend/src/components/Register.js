import React from "react";
import Sign from "./Sign.js";
import { Link } from "react-router-dom";
import FormValidator from "../hooks/useFormValidator";

const Register = ({ onRegistration, isLoading }) => {
  const link = (
    <p className="form__question">
      Уже зарегистрированы?
      <Link className="form__link" to="/sign-in">
         Войти
      </Link>
    </p>
  );

  const { inputValues, errorMessages, isValid, handleInputChange, resetForm } =
    FormValidator({});

  // const [email, setEmail] = React.useState("");
  // const [password, setPassword] = React.useState("");

  // function handleChangeEmail(e) {
  //   setEmail(e.target.value);
  // }

  // function handleChangePassword(e) {
  //   setPassword(e.target.value);
  // }

  React.useEffect(() => {
    resetForm();
  }, [resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegistration(inputValues);
  };

  return (
    <Sign
      title="Регистрация"
      buttonText="Зарегистрироваться"
      link={link}
      onSubmit={handleSubmit}
      isValid={isValid}
      isLoading={isLoading}
    >
      <section className="popup__form-section">
        <input
          className="form__input"
          type="email"
          name="email"
          placeholder="Email"
          required
          minLength="2"
          maxLength="40"
          onChange={handleInputChange}
        />
        <span
          className={
            !isValid
              ? "popup__input-error popup__input-error_active"
              : "popup__input-error"
          }
        >
          {errorMessages.email}
        </span>
      </section>
      <section className="popup__form-section">
        <input
          className="form__input"
          type="password"
          name="password"
          placeholder="Пароль"
          required
          minLength="2"
          maxLength="40"
          onChange={handleInputChange}
        />
        <span
          className={
            !isValid
              ? "popup__input-error popup__input-error_active"
              : "popup__input-error"
          }
        >
          {errorMessages.password}
        </span>
      </section>
    </Sign>
  );
};

export default Register;
