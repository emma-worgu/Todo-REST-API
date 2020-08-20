const Joi = require('joi');

const registerValidation = data => {
  const Schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
  });
  return Schema.validate(data);
};

const loginValidation = data => {
  const Schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  });
  return Schema.validate(data);
};

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation