const PartnerDao = require('../services/partner-dao');
const DishDao = require('../services/dish-dao');
const UserDao = require('../services/user-dao');

exports.createPartner = async (req, res) => {
    const { partner } = req.body;
    const newPartner = await PartnerDao.create(partner);
    res.send(newPartner);
};

exports.readPartnerByCity = async (req, res) => {
    const { city } = req.params;
    const partners = await PartnerDao.findAll({ city });
    res.send(partners);
};

module.exports.listDishes = async (req, res) => {
    try {
        const partner = await PartnerDao.findById({
            _id: req.param('partnerId')
        });
        res.status(200).send(partner.dishes);
    } catch (error) {
        console.log(`Something went wrong`, error.message);
        res.status(500).send(`Something went wrong`);
    }
};

module.exports.deleteDish = async (req, res) => {
    try {
        const dishId = req.param('dishId');

        let dish = await DishDao.findById({
            _id: dishId
        });

        let partner = await PartnerDao.findById({
            _id: dish.partner
        });

        partner.dishes.remove(dishId);
        partner = await PartnerDao.updateOne({ _id: partner._id }, partner);
        await DishDao.deleteById(dishId);

        res.status(200).send(partner);
    } catch (error) {
        console.log(`Something went wrong`, error.message);
        res.status(500).send(`Something went wrong`);
    }
};

module.exports.addDish = async (req, res) => {
    try {
        const partnerId = req.param('partnerId');
        let partner = await UserDao.findById({
            _id: partnerId
        });

        const newDish = await DishDao.create(req.body, partnerId);
        partner.dishes.push(newDish._id);
        partner = await UserDao.updateOne(partner);
        res.status(200).send(partner);
    } catch (error) {
        console.log(`Something went wrong`, error.message);
        res.status(500).send(`Something went wrong`);
    }
};

module.exports.editDish = async (req, res) => {
    try {
        await DishDao.updateOne(
            { _id: req.body._id },
            { $set: req.body });

        res.status(200).send();
    } catch (error) {
        console.log(`Something went wrong`, error.message);
        res.status(500).send(`Something went wrong`);
    }
};

module.exports.getAllPartners = async (req, res) => {
    try {
        const partners = await UserDao.getAllPartners();
        res.status(200).send(partners);
    } catch (error) {
        console.log(`Something went wrong`, error.message);
        res.status(500).send(`Something went wrong`);
    }
};