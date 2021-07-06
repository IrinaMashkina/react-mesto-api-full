const BadRequestError = require("../errors/bad-request-err");
const NotFoundError = require("../errors/not-found-err");
const ForbiddenError = require("../errors/forbidden-err");

const Card = require("../models/card");

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      if (cards.length === 0) {
        res.send({ message: "Карточки не найдены" });
        return;
      }
      res.send(cards);
    })
    .catch(next);
};

module.exports.createNewCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        throw new BadRequestError("Переданы некорректные данные");
      }
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError("Нет карточки с данным id");
      } else  if (card.owner.toString() !== req.user._id.toString()) {
        throw new ForbiddenError("Недостаточно прав");
      }
      Card.findByIdAndRemove(req.params.cardId)
        .then((deletedCard) => res.send(deletedCard))
        .catch(next);
    }).catch((err) => {
      if (err.name === "CastError") {
        throw new BadRequestError("Невалидный id");
      } else next(err);
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError("Нет карточки с данным id");
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        throw new BadRequestError("Невалидный id");
      } else next(err);
    })
    .catch(next);

module.exports.dislikeCard = (req, res, next) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError("Нет карточки с данным id");
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        throw new BadRequestError("Невалидный id");
      } else next(err);
    })
    .catch(next);
