const jwt = require('jsonwebtoken');
const { celebrate, Segments, Joi } = require('celebrate');

const { ENCRYPTION_KEY } = require('../utils/constants');
const { UNAUTHORIZED } = require('../utils/httpStatuses');
const { t } = require('../utils/translate');

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization ? authorization.replace('Bearer ', '') : null;

  if (!token) {
    return res
      .status(UNAUTHORIZED)
      .send({ message: t('authorization_needed') });
  }

  let payload;

  try {
    payload = jwt.verify(token, ENCRYPTION_KEY);
  } catch (err) {
    return res
      .status(UNAUTHORIZED)
      .send({ message: t('authorization_needed') });
  }

  req.user = payload;
  next();
};

const authLoginValidationMiddleware = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required().messages({
      'any.required': t('field_required', ['Email']),
      'string.empty': t('field_required', ['Email']),
      'string.email': t('incorrect_email'),
    }),
    password: Joi.string().required().messages({
      'any.required': t('field_required', ['Пароль']),
      'string.empty': t('field_required', ['Пароль']),
    }),
  }),
});

const authRegisterValidationMiddleware = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required().messages({
      'any.required': t('field_required', ['Email']),
      'string.empty': t('field_required', ['Email']),
      'string.email': t('incorrect_email'),
    }),
    password: Joi.string().required().min(8).messages({
      'any.required': t('field_required', ['Пароль']),
      'string.empty': t('field_required', ['Пароль']),
      'string.min': t('min_password_length_required'),
    }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'any.required': t('field_required', ['Имя']),
        'string.empty': t('field_required', ['Имя']),
        'string.min': t('min_field_length_required', ['Имя', '2']),
        'string.max': t('max_field_length_required', ['Имя', '30']),
      }),
  }),
});

module.exports = {
  authMiddleware,
  authLoginValidationMiddleware,
  authRegisterValidationMiddleware,
};
