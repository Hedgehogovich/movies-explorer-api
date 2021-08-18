const jwt = require('jsonwebtoken');
const { celebrate, Segments, Joi } = require('celebrate');

const { ENCRYPTION_KEY } = require('../../utils/constants');
const { UNAUTHORIZED } = require('../../utils/httpStatuses');

const authMiddleWare = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization ? authorization.replace('Bearer ', '') : null;

  if (!token) {
    return res
      .status(UNAUTHORIZED)
      .send({ message: 'Необходима авторизация' });
  }

  let payload;

  try {
    payload = jwt.verify(token, ENCRYPTION_KEY);
  } catch (err) {
    return res
      .status(UNAUTHORIZED)
      .send({ message: 'Необходима авторизация' });
  }

  req.user = payload;
  next();
};

const authLoginValidationMiddleware = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required().messages({
      'any.required': 'Поле Email является обязательным для заполнения',
      'string.empty': 'Поле Email является обязательным для заполнения',
      'string.email': 'Некорректный Email',
    }),
    password: Joi.string().required().messages({
      'any.required': 'Поле Пароль является обязательным для заполнения',
      'string.empty': 'Поле Пароль является обязательным для заполнения',
    }),
  }),
});

const authRegisterValidationMiddleware = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required().messages({
      'any.required': 'Поле Email является обязательным для заполнения',
      'string.empty': 'Поле Email является обязательным для заполнения',
      'string.email': 'Некорректный Email',
    }),
    password: Joi.string().required().min(8).messages({
      'any.required': 'Поле Пароль является обязательным для заполнения',
      'string.empty': 'Поле Пароль является обязательным для заполнения',
      'string.min': 'Пароль должен быть не менее 8 символов в длину',
    }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'any.required': 'Поле Имя является обязательным для заполнения',
        'string.empty': 'Поле Имя является обязательным для заполнения',
        'string.min': 'Имя должно быть не менее 2 символов в длину',
        'string.max': 'Имя должно быть не более 30 символов в длину',
      }),
  }),
});

module.exports = {
  authMiddleWare,
  authLoginValidationMiddleware,
  authRegisterValidationMiddleware,
};
