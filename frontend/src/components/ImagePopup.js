import React from "react";

function ImagePopup(props) {
  return (
    <section className={`popup popup_place_pic ${props.card ? "popup_opened" : ""}`} >
      <div className="popup__figure">
        <img src={props.card && props.card.link} alt={props.card && props.card.name} className="popup__image" />
        <h2 className="popup__title popup__title_place_pic">{props.card && props.card.name}</h2>
        <button
          className="popup__close-button popup__close-button_place_pic"
          type="button"
          aria-label="Закрыть"
          onClick = {props.onClose}
        ></button>
      </div>
    </section>
  );
}

export default ImagePopup;
