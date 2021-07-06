import React from "react";
import Sign from "./Sign.js";
import useFormValidator from "../hooks/useFormValidator";

const Login = ({ onAuthotization, isLoading }) => {
  const { inputValues, errorMessages, isValid, handleInputChange, resetForm } =
    useFormValidator({});

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
    onAuthotization(inputValues);
  };

  return (
    <Sign
      title="Вход"
      buttonText="Войти"
      onSubmit={handleSubmit}
      isValid={isValid}
      isLoading={isLoading}
    >
      <section className="popup__form-section">
        <input
          className="form__input"
          name="email"
          type="email"
          placeholder="Email"
          required
          minLength="2"
          maxLength="40"
          onChange={handleInputChange}
          value={inputValues.email ? inputValues.email : ""}
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
          name="password"
          className="form__input"
          type="password"
          placeholder="Пароль"
          required
          minLength="2"
          maxLength="40"
          value={inputValues.password ? inputValues.password : ""}
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

export default Login;
