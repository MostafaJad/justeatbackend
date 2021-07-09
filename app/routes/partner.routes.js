const express = require('express');
const router = express.Router();

const partnerController = require('../controllers/partner.controller');

module.exports = (app) => {
    router.get('/city/:city', partnerController.readPartnerByCity);
    router.put("/listDishes/:partnerId", partnerController.listDishes);
    router.post("/addDish/:partnerId", partnerController.addDish);
    router.put("/editDish/:dishId", partnerController.editDish);
    router.delete("/deleteDish/:dishId", partnerController.deleteDish);
    router.get('/', partnerController.getAllPartners);
    app.use('/partner', router);
};
