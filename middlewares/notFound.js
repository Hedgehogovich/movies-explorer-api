const { NotFoundError } = require('../utils/errors/NotFoundError');
const { t, tKeys } = require('../utils/translate');

module.exports.notFoundMiddleware = (req, res, next) => {
  next(new NotFoundError(t(tKeys.page_not_found)));
};
