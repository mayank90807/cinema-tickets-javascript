const Joi = require('joi');
const { childCheck } = require('./custom.validation');

const ticket = {
  body: Joi.object().keys({
    accountId: Joi.number().integer().min(1).required(),
    tickets: Joi.object().required().keys({
      adult: Joi.number().integer().min(0).required(),
      child: Joi.number().integer().min(0).optional(),
      infant: Joi.number().integer().min(0).optional(),    
  }).custom(childCheck),
  }),
};

module.exports = {
  ticket,
};
