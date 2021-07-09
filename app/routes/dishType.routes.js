const express = require('express');
const router = express.Router();

const dishTypeController = require('../controllers/dishType.controller');

module.exports = (app) => {
    router.get('/', dishTypeController.getDishTypes);
    app.use('/dishTypes', router);
};
