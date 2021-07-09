const express = require('express');
const router = express.Router();

const messageController = require('../controllers/message.controller');

module.exports = (app) => {
    router.post('/', messageController.createMessage);
    router.post('/chat', messageController.sendChat);
    app.use('/message', router);
};