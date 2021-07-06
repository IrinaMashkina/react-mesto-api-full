import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card({ card, onCardClick, onCardLike, onPopupDeleteCardOpen }) {
  const currentUser = React.useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;

  // ЗДЕСЬ Я ЗАДАЮ КЛАСС, КОТОРЫЙ ОТОБРАЖАЕТ КОРЗИНКУ УДАЛЕНИЯ
  const cardDeleteButtonClassName = (
    `card__delete ${isOwn ? 'card__delete_visible' : ''}`
  ); 


  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `card__like ${
    isLiked && "card__like_active"
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onPopupDeleteCardOpen(card);
  }

  return (
    <div className="template">
      <figure className="card">
        <img
          src={card.link}
          alt={card.name}
          className="card__image"
          onClick={handleClick}
        />
        <figcaption className="card__caption">
          <h2 className="card__title">{card.name}</h2>
          <div className="card__like-container">
            <button
              aria-label="Кнопка нравится."
              type="button"
              className={cardLikeButtonClassName}
              onClick={handleLikeClick}
            ></button>
            <span className="card__likes-count">{card.likes.length}</span>
          </div>
        </figcaption>
        <button
          onClick={handleDeleteClick}
          aria-label="Удалить карточку."
          type="button"
          className={cardDeleteButtonClassName}
        ></button>
      </figure>
    </div>
  );
}

export default Card;
