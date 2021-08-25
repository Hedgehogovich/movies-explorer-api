const { celebrate, Segments, Joi } = require('celebrate');
const { t, tKeys } = require('../utils/translate');

const userEditValidationMiddleware = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'any.required': t(tKeys.field_required, [t(tKeys.name)]),
        'string.empty': t(tKeys.field_required, [t(tKeys.name)]),
        'string.min': t(tKeys.min_field_length_required, [t(tKeys.name), '2']),
        'string.max': t(tKeys.max_field_length_required, [t(tKeys.name), '30']),
      }),
    email: Joi.string().email().required().messages({
      'any.required': t(tKeys.field_required, [t(tKeys.email)]),
      'string.empty': t(tKeys.field_required, [t(tKeys.email)]),
      'string.email': t(tKeys.incorrect_email),
    }),
  }),
});

module.exports = { userEditValidationMiddleware };
