const { celebrate, Segments, Joi } = require('celebrate');

const { t, tKeys } = require('../utils/translate');

const createMovieValidationMiddleware = celebrate({
  [Segments.BODY]: Joi.object().keys({
    country: Joi.string().required()
      .messages({
        'any.required': t(tKeys.field_required, [t(tKeys.country)]),
        'string.empty': t(tKeys.field_required, [t(tKeys.country)]),
        'string.base': t(tKeys.field_must_be_string, [t(tKeys.country)]),
      }),
    director: Joi.string().required()
      .messages({
        'any.required': t(tKeys.field_required, [t(tKeys.director)]),
        'string.empty': t(tKeys.field_required, [t(tKeys.director)]),
        'string.base': t(tKeys.field_must_be_string, [t(tKeys.director)]),
      }),
    duration: Joi.number().required()
      .messages({
        'any.required': t(tKeys.field_required, [t(tKeys.duration)]),
        'number.base': t(tKeys.field_must_be_number, [t(tKeys.duration)]),
      }),
    year: Joi.string().required()
      .messages({
        'any.required': t(tKeys.field_required, [t(tKeys.year)]),
        'string.empty': t(tKeys.field_required, [t(tKeys.year)]),
        'string.base': t(tKeys.field_must_be_string, [t(tKeys.year)]),
      }),
    description: Joi.string().required()
      .messages({
        'any.required': t(tKeys.field_required, [t(tKeys.description)]),
        'string.empty': t(tKeys.field_required, [t(tKeys.description)]),
        'string.base': t(tKeys.field_must_be_string, [t(tKeys.description)]),
      }),
    image: Joi.string().uri().required().messages({
      'any.required': t(tKeys.field_required, [t(tKeys.image)]),
      'string.empty': t(tKeys.field_required, [t(tKeys.image)]),
      'string.uri': t(tKeys.incorrect_movie_image),
    }),
    trailer: Joi.string().uri().required().messages({
      'any.required': t(tKeys.field_required, [t(tKeys.trailer)]),
      'string.empty': t(tKeys.field_required, [t(tKeys.trailer)]),
      'string.uri': t(tKeys.incorrect_movie_trailer_link),
    }),
    thumbnail: Joi.string().uri().required().messages({
      'any.required': t(tKeys.field_required, [t(tKeys.thumbnail)]),
      'string.empty': t(tKeys.field_required, [t(tKeys.thumbnail)]),
      'string.uri': t(tKeys.incorrect_movie_thumbnail_link),
    }),
    movieId: Joi.number().required()
      .messages({
        'any.required': t(tKeys.incorrect_movie_id),
        'number.base': t(tKeys.incorrect_movie_id),
      }),
    nameRU: Joi.string().required()
      .messages({
        'any.required': t(tKeys.field_required, [t(tKeys.nameRU)]),
        'string.empty': t(tKeys.field_required, [t(tKeys.nameRU)]),
        'string.base': t(tKeys.field_must_be_string, [t(tKeys.nameRU)]),
      }),
    nameEN: Joi.string().required()
      .messages({
        'any.required': t(tKeys.field_required, [t(tKeys.nameEN)]),
        'string.empty': t(tKeys.field_required, [t(tKeys.nameEN)]),
        'string.base': t(tKeys.field_must_be_string, [t(tKeys.nameEN)]),
      }),
  }),
});

const removeMovieIdValidationMiddleware = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required()
      .messages({
        'any.required': t(tKeys.incorrect_movie_id),
        'string.base': t(tKeys.incorrect_movie_id),
        'string.length': t(tKeys.incorrect_movie_id),
        'string.hex': t(tKeys.incorrect_movie_id),
      }),
  }),
});

module.exports = { createMovieValidationMiddleware, removeMovieIdValidationMiddleware };
