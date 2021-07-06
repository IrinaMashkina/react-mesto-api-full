import React from "react";
import successIcon from "../images/successIcon.svg";
import notSuccesIcon from "../images/notSuccessIcon.svg";

const InfoTooltip = (props) => {
  return (
    <section className={`popup popup_place_infotooltip ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <img
          className="popup__icon"
          src={props.isSuccessSignup ? successIcon : notSuccesIcon}
          alt={
            props.isSuccessSignup
              ? "иконка успешной регистрации"
              : "иконка неуспешной авторизации"
          }
        />
        <h3 className="popup__title_place_infotooltip">
          {props.isSuccessSignup
            ? props.successText
            : props.unSuccessText}
        </h3>
        <button
          onClick={props.onClose}
          type="button"
          className="popup__close-button"
          aria-label="закрыть"
        />
      </div>
    </section>
  );
};

export default InfoTooltip;
