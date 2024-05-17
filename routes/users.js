const usersRouter = require('express').Router();
const { checkAuth } = require('../middlewares/auth.js');

const {
    findAllUsers, findUserById, updateUser, createUser, deleteUser,
    checkEmptyNameAndEmail, checkIsUserExists, hashPassword
} = require('../middlewares/users');
const {
    sendAllUsers, sendUserById,
    sendUserUpdated, sendUserCreated,
    sendUserDeleted, sendMe
} = require('../controllers/users');

usersRouter.get(
    '/users/me',
    checkAuth,
    sendMe
);

usersRouter.get(
    '/users',
    findAllUsers,
    sendAllUsers
);

usersRouter.post(
    '/users',
    findAllUsers,
    checkIsUserExists,
    checkEmptyNameAndEmail,
    checkAuth,
    hashPassword,
    createUser,
    sendUserCreated
);

usersRouter.get(
    '/users/:id',
    findUserById,
    sendUserById
);

usersRouter.put(
    '/users/:id',
    checkEmptyNameAndEmail,
    checkAuth,
    updateUser,
    sendUserUpdated
);

usersRouter.delete(
    '/users/:id',
    checkAuth,
    deleteUser,
    sendUserDeleted
);

module.exports = usersRouter;