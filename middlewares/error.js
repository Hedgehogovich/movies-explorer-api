const { isCelebrateError } = require('celebrate');

const { BAD_REQUEST } = require('../utils/httpStatuses');

function handleCelebrateError(err, req, res) {
  const [, firstSegmentError] = err.details.entries().next().value;

  return res.status(BAD_REQUEST).send({ message: firstSegmentError.message });
}

module.exports.errorMiddleware = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (isCelebrateError(err)) {
    return handleCelebrateError(err, req, res);
  }

  return res.status(err.statusCode).send({ message: err.message });
};
