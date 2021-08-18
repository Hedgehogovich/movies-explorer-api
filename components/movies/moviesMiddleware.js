const { celebrate, Segments, Joi } = require('celebrate');

const createMovieValidationMiddleware = celebrate({
  [Segments.BODY]: Joi.object().keys({
    country: Joi.string().required()
      .messages({
        'any.required': 'Поле "Страна" обязательно для заполнения',
        'string.empty': 'Поле "Страна" обязательно для заполнения',
      }),
    director: Joi.string().required()
      .messages({
        'any.required': 'Поле "Режиссёр" обязательно для заполнения',
        'string.empty': 'Поле "Режиссёр" обязательно для заполнения',
      }),
    duration: Joi.number().required()
      .messages({
        'any.required': 'Поле "Длительность" обязательно для заполнения',
      }),
    year: Joi.string().required()
      .messages({
        'any.required': 'Поле "Год" обязательно для заполнения',
        'string.empty': 'Поле "Год" обязательно для заполнения',
      }),
    description: Joi.string().required()
      .messages({
        'any.required': 'Поле "Описание" обязательно для заполнения',
        'string.empty': 'Поле "Описание" обязательно для заполнения',
      }),
    image: Joi.string().uri().required().messages({
      'any.required': 'Поле "Ссылка на постер" обязательно для заполнения',
      'string.empty': 'Поле "Ссылка на постер" обязательно для заполнения',
      'string.uri': 'Некорректная ссылка на постер',
    }),
    trailer: Joi.string().uri().required().messages({
      'any.required': 'Поле "Ссылка на трейлер" обязательно для заполнения',
      'string.empty': 'Поле "Ссылка на трейлер" обязательно для заполнения',
      'string.uri': 'Некорректная ссылка на трейлер',
    }),
    thumbnail: Joi.string().uri().required().messages({
      'any.required': 'Поле "Миниатюра" обязательно для заполнения',
      'string.empty': 'Поле "Миниатюра" обязательно для заполнения',
      'string.uri': 'Некорректная ссылка на миниатюру',
    }),
    owner: Joi.string().length(24).hex().required()
      .messages({
        'any.required': 'Некорректный ID владельца',
        'string.base': 'Некорректный ID владельца',
        'string.length': 'Некорректный ID владельца',
        'string.hex': 'Некорректный ID владельца',
      }),
    movieId: Joi.string().length(24).hex().required()
      .messages({
        'any.required': 'Некорректный ID фильма',
        'string.base': 'Некорректный ID фильма',
        'string.length': 'Некорректный ID фильма',
        'string.hex': 'Некорректный ID фильма',
      }),
    nameRu: Joi.string().required()
      .messages({
        'any.required': 'Поле "Имя фильма на русском" обязательно для заполнения',
        'string.empty': 'Поле "Имя фильма на русском" для заполнения',
      }),
    nameEn: Joi.string().required()
      .messages({
        'any.required': 'Поле "Имя фильма на английском" обязательно для заполнения',
        'string.empty': 'Поле "Имя фильма на английском" обязательно для заполнения',
      }),
  }),
});

const removeMovieIdValidationMiddleware = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required()
      .messages({
        'any.required': 'Некорректный ID фильма',
        'string.base': 'Некорректный ID фильма',
        'string.length': 'Некорректный ID фильма',
        'string.hex': 'Некорректный ID фильма',
      }),
  }),
});

module.exports = { createMovieValidationMiddleware, removeMovieIdValidationMiddleware };
