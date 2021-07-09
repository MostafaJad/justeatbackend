const DishAvailability = require("../models/dishavailability");
const User = require("../models/user");

module.exports.create = async dishAvailability => {
  return DishAvailability.create(dishAvailability);
};

module.exports.createMany = async dishAvailabilities => {
  return DishAvailability.insertMany(dishAvailabilities);
};

module.exports.findAll = async query => {
  return DishAvailability.find(query).populate({
    path: "dish",
    populate: {
      path: "partner"
    }
  });
};

module.exports.findOne = async query => {
  return DishAvailability.findOne(query);
};

module.exports.findById = async id => {
  return DishAvailability.findById(id);
};

module.exports.deleteAll = async () => {
  return DishAvailability.remove({});
};

module.exports.findByLocation = async ({
  ne_lat,
  ne_lng,
  sw_lat,
  sw_lng,
  dishType
}) => {

  const matchDishType = dishType ? {
    dishType
  } : {};
  const partners = await User.find({
    latitude: {
      $gte: sw_lat,
      $lte: ne_lat
    },
    longitude: {
      $gte: sw_lng,
      $lte: ne_lng
    },
  }).populate({
    path: "dishes",
    model: "dish",
    match: matchDishType,
    populate: {
      path: "dishAvailability"
    }
  });

  return partners;
};

module.exports.findByPartnerId = async id => {
  const dishAvailabilities = await DishAvailability.find({})
    .populate({
      path: "dish",
      populate: {
        path: "partner",
      }
    });
  const withDishes = dishAvailabilities.filter(x => x.dish != undefined);
  return withDishes.filter(x => x.dish.partner.id === id);
}