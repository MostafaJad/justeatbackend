const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: [/.+\@.+\..+/, "Please fill a valid email address"],
    },
    phone: {
        type: Number
    },
    message: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('message', schema);