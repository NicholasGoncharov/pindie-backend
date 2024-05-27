const games = require('../models/game');

const findAllGames = async (req, res, next) => {
    if (req.query['categories.name']) {
        req.gamesArray = await games.findGameByCategory(req.query['categories.name']);
        next();

        return;
    }
    
    req.gamesArray = await games
        .find({})
        .populate('categories')
        .populate({
            path: 'users',
            select: '-password'
        })

    next();
};

const findGameById = async (req, res, next) => {
    try {
        req.game = await games.findById(req.params.id)
            .populate('categories')
            .populate({
                path: 'users',
                select: '-password'
            })

        next();
    } catch (error) {
        res.status(404).send({ message: 'Game not found' });
    }
};

const createGame = async (req, res, next) => {
    try {
        req.game = await games.create(req.body);

        next();
    } catch (error) {
        res.status(400).send('Error create game');
    }
};

const updateGame = async (req, res, next) => {
    if (req.isVoteRequest) {
        try {
            let allowVote = 0;

            for (let user of req.game.users) {
                if (user._id == req.params.user._id) allowVote += 1;
            }

            if (!allowVote) {
                Object(req.game.users).push(req.user._id);
                req.game = await games.findByIdAndUpdate(req.game._id, req.game)
            }

            next();
        } catch (error) {
            res.status(400).send({ message: 'Error update game' });
        }
    } else {
        try {
            req.game = await games.findByIdAndUpdate(req.params.id, req.body);

            next();
        } catch (error) {
            res.status(400).send({ message: 'Error update game' });
        }
    }
};

const deleteGame = async (req, res, next) => {
    try {
        req.game = await games.findByIdAndDelete(req.params.id);

        next();
    } catch (error) {
        res.status(400).send({ message: 'Error delete game' });
    }
};

const checkEmptyFields = async (req, res, next) => {
    if(req.isVoteRequest) {
        next();

        return;
    } else {
        if (
            !req.body.title ||
            !req.body.description ||
            !req.body.image ||
            !req.body.link ||
            !req.body.developer
        ) {
            res.status(400).send({ message: 'Заполни все поля' });
        } else {
            next();
        }
    }
};

const checkIfCategoriesAvaliable = async (req, res, next) => {
    if(req.isVoteRequest) {
        next();

        return;
    } else {
        if (!req.body.categories || req.body.categories.length === 0) {
            res.headers = { 'Content-Type': 'application/json' };

            res.status(400).send({ message: 'Выбери хотя бы одну категорию' });
        } else {
            next();
        }
    }
};

const checkIfUsersAreSafe = async (req, res, next) => {
    if (!req.body.users) {
        next();

        return;
    }

    if (req.body.users.length - 1 === req.game.users.length) {
        next();

        return;
    } else {
        res
            .status(400)
            .send(
                'Нельзя удалять пользователей или добавлять больше одного пользователя'
            );
    }
};

const checkIsGameExists = async (req, res, next) => {
    const isInArray = req.gamesArray.find((game) => {
        return req.body.title === game.title;
    });

    if (isInArray) {
        res.status(400).send({ message: 'Игра с таким названием уже существует' });
    } else {
        next();
    }
};

const checkIsVoteRequest = async (req, res, next) => {
    if (Object.keys(req.body).length === 1 && req.body.users) {
        req.isVoteRequest = true;
    }

    next();
};

module.exports = {
    findAllGames,
    findGameById,
    createGame,
    updateGame,
    deleteGame,
    checkEmptyFields,
    checkIfCategoriesAvaliable,
    checkIsGameExists,
    checkIfUsersAreSafe,
    checkIsVoteRequest
};