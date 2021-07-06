import React from "react";

function PopupWithForm(props) {
  return (
    <section
      className={`popup popup_place_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <form
        className="popup__container popup__form forms"
        name={props.name}
        action="#"
        noValidate
        onSubmit={props.onSubmit}
      >
        <h2 className="popup__title">{props.title}</h2>
        {props.children}
        <button  className={(props.isLoading || !props.isValid) ? "popup__submit popup__submit_type_save popup__submit_disabled" : "popup__submit popup__submit_type_save"} type="submit">{props.buttonText}
        </button>
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть"
          onClick={props.onClose}
          
        ></button>
      </form>
    </section>
  );
}
export default PopupWithForm;
