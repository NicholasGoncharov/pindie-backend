const gamesRouter = require('./games');
const categoriesRouter = require('./categories');
const usersRouter = require('./users');
const mainRouter = require('./main');
const authRouter = require('./auth');

const apiRouter = require('express').Router();

apiRouter.use('/', mainRouter);
apiRouter.use('/api', gamesRouter);
apiRouter.use('/api', categoriesRouter);
apiRouter.use('/api', usersRouter);
apiRouter.use('/api', authRouter);

module.exports = apiRouter;