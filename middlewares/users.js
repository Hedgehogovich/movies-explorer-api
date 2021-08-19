const { celebrate, Segments, Joi } = require('celebrate');

const userEditValidationMiddleware = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'any.required': 'Поле Имя обязательно для заполнения',
        'string.empty': 'Поле Имя обязательно для заполнения',
        'string.min': 'Имя должно быть не менее 2 символов в длину',
        'string.max': 'Имя должно быть не более 30 символов в длину',
      }),
    email: Joi.string().email().required().messages({
      'any.required': 'Поле Email является обязательным для заполнения',
      'string.empty': 'Поле Email является обязательным для заполнения',
      'string.email': 'Некорректный Email',
    }),
  }),
});

module.exports = { userEditValidationMiddleware };
