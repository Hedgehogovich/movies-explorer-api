const { celebrate, Segments, Joi } = require('celebrate');
const { t } = require('../utils/translate');

const userEditValidationMiddleware = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'any.required': t('field_required', ['Имя']),
        'string.empty': t('field_required', ['Имя']),
        'string.min': t('min_field_length_required', ['Имя', '2']),
        'string.max': t('max_field_length_required', ['Имя', '30']),
      }),
    email: Joi.string().email().required().messages({
      'any.required': t('field_required', ['Email']),
      'string.empty': t('field_required', ['Email']),
      'string.email': t('incorrect_email'),
    }),
  }),
});

module.exports = { userEditValidationMiddleware };
