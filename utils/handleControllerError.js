const mongoose = require('mongoose');

const { BAD_REQUEST } = require('./httpStatuses');
const { t, tKeys } = require('./translate');
const { BadRequestError } = require('./errors/BadRequestError');
const { InternalServerError } = require('./errors/InternalServerError');
const { ForbiddenError } = require('./errors/ForbiddenError');
const { NotFoundError } = require('./errors/NotFoundError');
const { UnauthorizedError } = require('./errors/UnauthorizedError');
const { ConflictError } = require('./errors/ConflictError');
const { MONGODB_DUPLICATE_ERROR_CODE } = require('./constants');

module.exports.handleControllerError = (err) => {
  if (err.code === MONGODB_DUPLICATE_ERROR_CODE) {
    throw new ForbiddenError(t(tKeys.user_already_exists));
  }

  switch (err.name) {
    case mongoose.Error.ValidationError.name:
    case mongoose.Error.CastError.name:
      throw new BadRequestError(t(tKeys.incorrect_data));
    case mongoose.Error.DocumentNotFoundError.name:
      throw new NotFoundError(t(tKeys.data_not_found));
    case SyntaxError.name:
      // Обработка исключения при некорректном JSON внутри express
      if (err.status === BAD_REQUEST && 'body' in err) {
        throw new BadRequestError(t(tKeys.incorrect_data));
      }

      throw new InternalServerError(t(tKeys.server_error));
    case BadRequestError.name:
    case InternalServerError.name:
    case ForbiddenError.name:
    case NotFoundError.name:
    case UnauthorizedError.name:
    case ConflictError.name:
      throw err;
    default:
      throw new InternalServerError(t(tKeys.server_error));
  }
};
