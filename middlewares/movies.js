const { celebrate, Segments, Joi } = require('celebrate');

const { t } = require('../utils/translate');

const createMovieValidationMiddleware = celebrate({
  [Segments.BODY]: Joi.object().keys({
    country: Joi.string().required()
      .messages({
        'any.required': t('field_required', ['Страна']),
        'string.empty': t('field_required', ['Страна']),
        'string.base': t('field_must_be_string', ['Страна']),
      }),
    director: Joi.string().required()
      .messages({
        'any.required': t('field_required', ['Режиссёр']),
        'string.empty': t('field_required', ['Режиссёр']),
        'string.base': t('field_must_be_string', ['Режиссёр']),
      }),
    duration: Joi.number().required()
      .messages({
        'any.required': t('field_required', ['Длительность']),
        'number.base': t('field_must_be_number', ['Длительность']),
      }),
    year: Joi.string().required()
      .messages({
        'any.required': t('field_required', ['Год']),
        'string.empty': t('field_required', ['Год']),
        'string.base': t('field_must_be_string', ['Год']),
      }),
    description: Joi.string().required()
      .messages({
        'any.required': t('field_required', ['Описание']),
        'string.empty': t('field_required', ['Описание']),
        'string.base': t('field_must_be_string', ['Описание']),
      }),
    image: Joi.string().uri().required().messages({
      'any.required': t('field_required', ['Ссылка на постер']),
      'string.empty': t('field_required', ['Ссылка на постер']),
      'string.uri': t('incorrect_movie_image'),
    }),
    trailer: Joi.string().uri().required().messages({
      'any.required': t('field_required', ['Ссылка на трейлер']),
      'string.empty': t('field_required', ['Ссылка на трейлер']),
      'string.uri': t('incorrect_movie_trailer_link'),
    }),
    thumbnail: Joi.string().uri().required().messages({
      'any.required': t('field_required', ['Миниатюра']),
      'string.empty': t('field_required', ['Миниатюра']),
      'string.uri': t('incorrect_movie_thumbnail_link'),
    }),
    movieId: Joi.string().required()
      .messages({
        'any.required': t('incorrect_movie_id'),
        'string.base': t('incorrect_movie_id'),
        'string.empty': t('incorrect_movie_id'),
      }),
    nameRU: Joi.string().required()
      .messages({
        'any.required': t('field_required', ['Имя фильма на русском']),
        'string.empty': t('field_required', ['Имя фильма на русском']),
        'string.base': t('field_must_be_string', ['Имя фильма на русском']),
      }),
    nameEN: Joi.string().required()
      .messages({
        'any.required': t('field_required', ['Имя фильма на английском']),
        'string.empty': t('field_required', ['Имя фильма на английском']),
        'string.base': t('field_must_be_string', ['Имя фильма на английском']),
      }),
  }),
});

const removeMovieIdValidationMiddleware = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required()
      .messages({
        'any.required': t('incorrect_movie_id'),
        'string.base': t('incorrect_movie_id'),
        'string.length': t('incorrect_movie_id'),
        'string.hex': t('incorrect_movie_id'),
      }),
  }),
});

module.exports = { createMovieValidationMiddleware, removeMovieIdValidationMiddleware };
