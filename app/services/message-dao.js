const Message = require("../models/message");

module.exports.create = async message => {
    return Message.create(message);
};