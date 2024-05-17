const categories = require('../models/category');
const games = require('../models/game');
const users = require('../models/user');

const findAllCategories = async (req, res, next) => {
    req.categoriesArray = await categories.find({});

    next();
}

const findCategoryById = async (req, res, next) => {
    try {
        req.category = await categories.findById(req.params.id);

        next();
    } catch (error) {
        res.status(404).send({ message: 'Category not found' });
    }
};

const createCategory = async (req, res, next) => {
    try {
        req.category = await categories.create(req.body);

        next();
    } catch (error) {
        res.status(400).send('Error creating category');
    }
};

const updateCategory = async (req, res, next) => {
    try {
        req.category = await categories.findByIdAndUpdate(req.params.id, req.body);

        next();
    } catch (error) {
        res.status(400).send({ message: 'Error update category' });
    }
};

const deleteCategory = async (req, res, next) => {
    try {
        req.category = await categories.findByIdAndDelete(req.params.id);

        next();
    } catch (error) {
        res.status(400).send({ message: 'Error delete category' });
    }
};

const checkIsCategoryExists = async (req, res, next) => {
    const isInArray = req.categoriesArray.find((category) => {
        return req.body.name === category.name;
    });

    if (isInArray) {
        res.status(400).send({ message: 'A category with that name already exists' });
    } else {
        next();
    }
};

const checkEmptyName = async (req, res, next) => {
    if (!req.body.name) {
        res.status(400).send({ message: 'Введите название категории' });
    } else {
        next();
    }
};

module.exports = {
    findAllCategories,
    findCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
    checkIsCategoryExists,
    checkEmptyName
};