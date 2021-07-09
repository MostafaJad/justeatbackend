const {param, body} = require("express-validator");

module.exports.userEditValidationRules = () => [
  param("userId", "Invalid User ID format.").isLength({min: 24, max: 24}),
  body("email", "Invalid format.").isEmail()
];
