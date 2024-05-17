const gamesRouter = require('express').Router();
const { checkAuth } = require('../middlewares/auth.js');

const {
    findAllGames, findGameById, createGame, updateGame, deleteGame,
    checkEmptyFields, checkIfUsersAreSafe, checkIfCategoriesAvaliable,
    checkIsGameExists, checkIsVoteRequest
} = require('../middlewares/games');
const {
    sendAllGames, sendGameById,
    sendGameCreated, sendGameUpdated,
    sendGameDeleted
} = require('../controllers/games');

gamesRouter.get(
    '/games',
    findAllGames,
    sendAllGames
);

gamesRouter.post(
    '/games',
    findAllGames,
    checkIsGameExists,
    checkIfCategoriesAvaliable,
    checkEmptyFields,
    checkAuth,
    createGame,
    sendGameCreated,
);

gamesRouter.get(
    '/games/:id',
    findGameById,
    sendGameById
);

gamesRouter.put(
    '/games/:id',
    findGameById,
    checkIsVoteRequest,
    checkIfUsersAreSafe,
    checkIfCategoriesAvaliable,
    checkEmptyFields,
    checkAuth,
    updateGame,
    sendGameUpdated
);

gamesRouter.delete(
    '/games/:id',
    checkAuth,
    deleteGame,
    sendGameDeleted
);

module.exports = gamesRouter;