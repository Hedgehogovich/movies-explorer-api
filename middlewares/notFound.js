const { NotFoundError } = require('../utils/errors/NotFoundError');
const { t } = require('../utils/translate');

module.exports = (req, res, next) => {
  next(new NotFoundError(t('page_not_found')));
};
