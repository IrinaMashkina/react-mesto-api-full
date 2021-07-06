const cardsRoutes = require('express').Router();

const { getCards, createNewCard, deleteCard, likeCard, dislikeCard } = require('../controllers/cards');

cardsRoutes.get('/cards', getCards);
cardsRoutes.post('/cards', createNewCard);
cardsRoutes.delete('/cards/:cardId', deleteCard);
cardsRoutes.put('/cards/:cardId/likes', likeCard);
cardsRoutes.delete('/cards/:cardId/likes', dislikeCard);

module.exports = cardsRoutes;
