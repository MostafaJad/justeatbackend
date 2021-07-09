const User = require("../models/user");

module.exports.create = async partner => {
  return User.create(partner);
};
module.exports.findOne = async query => {
  return User.findOne(query);
};

module.exports.findAll = async query => {
  return User.find(query);
};

module.exports.findById = async id => {
  return User.findById(id);
};

module.exports.deleteAll = async () => {
  return User.remove({});
};

module.exports.createAll = async partners => {
  return User.insertMany(partners);
};

module.exports.updateOne = async (query, partner) => {
  return User.findOneAndUpdate(query, partner);
};