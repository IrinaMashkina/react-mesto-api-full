import React from "react";
import PopupWithForm from "./PopupWithForm";
import useFormValidator from "../hooks/useFormValidator.js";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoadingAddNewCard }) {


  const { inputValues, errorMessages, isValid, handleInputChange, resetForm } =
    useFormValidator({});


  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(inputValues);
  };

  React.useEffect(() => {
    resetForm();
  }, [isOpen, resetForm])


  return (
    <PopupWithForm
      title="Новое место"
      buttonText={isLoadingAddNewCard ? "Сохранение..." : "Создать"}
      name="card-add"
      isOpen={isOpen}
      onClose={onClose}
      isLoading={isLoadingAddNewCard}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <section className="popup__form-section">
        <input
          className="popup__input popup__input_type_title"
          id="input-card-title"
          name="name"
          type="text"
          required
          minLength="2"
          maxLength="30"
          value={inputValues.name? inputValues.name :  ""}
          placeholder="Название"
          onChange={handleInputChange}
        />
       <span className={!isValid ? "popup__input-error popup__input-error_active" : "popup__input-error" } id="input-card-title-error">{errorMessages.name}</span>
      </section>
      <section className="popup__form-section">
        <input
          className="popup__input popup__input_type_link"
          id="input-card-link"
          name="link"
          type="url"
          required
          value={inputValues.link ? inputValues.link : ""}
          placeholder="Ссылка на картинку"
          onChange={handleInputChange}
        />
        <span className={!isValid ? "popup__input-error popup__input-error_active" : "popup__input-error" } id="input-card-link-error">{errorMessages.link}</span>
      </section>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
