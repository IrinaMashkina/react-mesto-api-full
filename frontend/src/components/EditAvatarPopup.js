import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import useFormValidator from "../hooks/useFormValidator.js";

function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  isLoadingEditAvatar,
}) {
  // const [avatar, setAvatar] = React.useState("");

  const { inputValues, errorMessages, isValid, handleInputChange, resetForm } =
  useFormValidator({});

  React.useEffect(() => {
    resetForm();
  }, [isOpen, resetForm])

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(inputValues.link);
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      buttonText={isLoadingEditAvatar ? "Сохранение..." : "Сохранить"}
      isLoading={isLoadingEditAvatar}
      name="avatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <section className="popup__form-section">
        <input
          onChange={handleInputChange}
          className="popup__input popup__input_type_link"
          id="input-avatar-link"
          name="link"
          type="url"
          required
          value = {inputValues.link ? inputValues.link : ""}
          placeholder="https://somewebsite.com/someimage.jpg"
        />
        <span className={!isValid ? "popup__input-error popup__input-error_active" : "popup__input-error" }
          id="input-avatar-link-error"
        >{errorMessages.link}</span>
      </section>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
