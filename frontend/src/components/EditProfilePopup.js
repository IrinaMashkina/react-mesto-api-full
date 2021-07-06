import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import useFormValidator from '../hooks/useFormValidator.js';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoadingUserInfo }) {

  
  const currentUser = React.useContext(CurrentUserContext);

  const {inputValues, errorMessages, isValid, handleInputChange, resetForm} = useFormValidator({});

  React.useEffect(() => {
    if (currentUser) {
      resetForm(currentUser);
    }
  }, [currentUser, resetForm, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(inputValues);
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      buttonText={isLoadingUserInfo? "Сохранение..." : "Сохранить"}
      isLoading={isLoadingUserInfo}
      name="edit"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <section className="popup__form-section">
        <input
          className="popup__input popup__input_type_name"
          id="input-name"
          name="name"
          type="text"
          required
          minLength="2"
          maxLength="40" 
          value={inputValues.name? inputValues.name :  ""}
          onChange={handleInputChange}
        />
        <span className={!isValid ? "popup__input-error popup__input-error_active" : "popup__input-error" } id="input-name-error">{errorMessages.name}</span>
      </section>
      <section className="popup__form-section">
        <input
          className="popup__input popup__input_type_job"
          id="input-job"
          name="about"
          type="text"
          required
          minLength="2"
          maxLength="200"
          value={inputValues.about ? inputValues.about : ""}
          onChange={handleInputChange}
        />
        <span className={!isValid ? "popup__input-error popup__input-error_active" : "popup__input-error" } id="input-job-error" >{errorMessages.about}</span>
      </section>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
