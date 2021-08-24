const jwt = require('jsonwebtoken');
const { celebrate, Segments, Joi } = require('celebrate');

const { ENCRYPTION_KEY } = require('../utils/constants');
const { t, tKeys } = require('../utils/translate');
const { UnauthorizedError } = require('../utils/errors/UnauthorizedError');

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization ? authorization.replace('Bearer ', '') : null;

  if (!token) {
    return next(new UnauthorizedError(t(tKeys.authorization_needed)));
  }

  let payload;

  try {
    payload = jwt.verify(token, ENCRYPTION_KEY);
  } catch (err) {
    return next(new UnauthorizedError(t(tKeys.authorization_needed)));
  }

  req.user = payload;
  return next();
};

const authLoginValidationMiddleware = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required().messages({
      'any.required': t(tKeys.field_required, [t(tKeys.email)]),
      'string.empty': t(tKeys.field_required, [t(tKeys.email)]),
      'string.email': t(tKeys.incorrect_email),
    }),
    password: Joi.string().required().messages({
      'any.required': t(tKeys.field_required, [t(tKeys.password)]),
      'string.empty': t(tKeys.field_required, [t(tKeys.password)]),
    }),
  }),
});

const authRegisterValidationMiddleware = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required().messages({
      'any.required': t(tKeys.field_required, [t(tKeys.email)]),
      'string.empty': t(tKeys.field_required, [t(tKeys.email)]),
      'string.email': t(tKeys.incorrect_email),
    }),
    password: Joi.string().required().min(8).messages({
      'any.required': t(tKeys.field_required, [t(tKeys.password)]),
      'string.empty': t(tKeys.field_required, [t(tKeys.password)]),
      'string.min': t(tKeys.min_password_length_required),
    }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'any.required': t(tKeys.field_required, [t(tKeys.name)]),
        'string.empty': t(tKeys.field_required, [t(tKeys.name)]),
        'string.min': t(tKeys.min_field_length_required, [t(tKeys.name), '2']),
        'string.max': t(tKeys.max_field_length_required, [t(tKeys.name), '30']),
      }),
  }),
});

module.exports = {
  authMiddleware,
  authLoginValidationMiddleware,
  authRegisterValidationMiddleware,
};
