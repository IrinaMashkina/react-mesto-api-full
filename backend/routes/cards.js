const cardsRoutes = require('express').Router();

const { getCards, createNewCard, deleteCard, likeCard, dislikeCard } = require('../controllers/cards');

cardsRoutes.get('/cards', getCards);
cardsRoutes.post('/cards', createNewCard);
cardsRoutes.delete('/cards/:cardId', deleteCard);
cardsRoutes.put('/cards/likes/:cardId', likeCard);
cardsRoutes.delete('/cards/likes/:cardId', dislikeCard);

module.exports = cardsRoutes;
