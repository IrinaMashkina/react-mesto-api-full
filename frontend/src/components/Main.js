import React from "react";
import Card from "./Card.js";
import editButton from "../images/edit-button.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";


function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__information">
          <div
            className="profile__avatar-container"
            onClick={props.onEditAvatar}
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
          >
            <img className="profile__avatar-edit" src={editButton} alt="Кнопка редактирования аватара."/>
          </div>

          <div className="profile__info">
            <div className="profile__wrapper">
              <h1 className="profile__name">{!props.isLoadingUserInfo? currentUser.name : '......'}</h1>
              <button
                type="button"
                aria-label="Кнопка открытия попапа"
                className="profile__edit-button"
                onClick={() =>
                  props.onEditProfile(currentUser.name, currentUser.about)
                }
              ></button>
            </div>
            <p className="profile__profession">{!props.isLoadingUserInfo? currentUser.about : '......'}</p>
          </div>
        </div>
        <button
          aria-label="Кнопка добавления фотографий"
          type="button"
          className="profile__add-button"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <section className="elements">
        {props.isLoadingInitialCards && <p className='elements__message'>Загружаются картинки...</p>}
        {!props.isLoadingInitialCards && props.cards.map((card) => (
          <Card
            card={card}
            key={card._id}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onPopupDeleteCardOpen={props.onPopupDeleteCardOpen}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
