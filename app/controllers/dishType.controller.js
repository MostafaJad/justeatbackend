const DishTypeDao = require('../services/dishtype-dao');

exports.getDishTypes = async (req, res) => {
    const dishTypes = await DishTypeDao.findAll({});
    res.send(dishTypes);
};