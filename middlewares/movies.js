const { celebrate, Segments, Joi } = require('celebrate');

const createMovieValidationMiddleware = celebrate({
  [Segments.BODY]: Joi.object().keys({
    country: Joi.string().required()
      .messages({
        'any.required': 'Поле "Страна" обязательно для заполнения',
        'string.empty': 'Поле "Страна" обязательно для заполнения',
        'string.base': 'Поле "Страна" должно быть строкой',
      }),
    director: Joi.string().required()
      .messages({
        'any.required': 'Поле "Режиссёр" обязательно для заполнения',
        'string.empty': 'Поле "Режиссёр" обязательно для заполнения',
        'string.base': 'Поле "Режиссёр" должно быть строкой',
      }),
    duration: Joi.number().required()
      .messages({
        'any.required': 'Поле "Длительность" обязательно для заполнения',
        'number.base': 'Поле "Длительность" должно быть числом',
      }),
    year: Joi.string().required()
      .messages({
        'any.required': 'Поле "Год" обязательно для заполнения',
        'string.empty': 'Поле "Год" обязательно для заполнения',
        'string.base': 'Поле "Год" должно быть строкой',
      }),
    description: Joi.string().required()
      .messages({
        'any.required': 'Поле "Описание" обязательно для заполнения',
        'string.empty': 'Поле "Описание" обязательно для заполнения',
        'string.base': 'Поле "Описание" должно быть строкой',
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
    movieId: Joi.string().required()
      .messages({
        'any.required': 'Некорректный ID фильма',
        'string.base': 'Некорректный ID фильма',
        'string.empty': 'Некорректный ID фильма',
      }),
    nameRU: Joi.string().required()
      .messages({
        'any.required': 'Поле "Имя фильма на русском" обязательно для заполнения',
        'string.empty': 'Поле "Имя фильма на русском" для заполнения',
        'string.base': 'Поле "Имя фильма на русском" должно быть строкой',
      }),
    nameEN: Joi.string().required()
      .messages({
        'any.required': 'Поле "Имя фильма на английском" обязательно для заполнения',
        'string.empty': 'Поле "Имя фильма на английском" обязательно для заполнения',
        'string.base': 'Поле "Имя фильма на английском" должно быть строкой',
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
