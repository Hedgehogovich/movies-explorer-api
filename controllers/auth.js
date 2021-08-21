const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { BCRYPT_SALT_ROUNDS, MONGODB_DUPLICATE_ERROR_CODE, ENCRYPTION_KEY } = require('../utils/constants');
const { ConflictError } = require('../utils/errors/ConflictError');
const { UnauthorizedError } = require('../utils/errors/UnauthorizedError');
const { t } = require('../utils/translate');

const TOKEN_EXPIRE_TIME = 604800;

module.exports.register = ({
  name,
  email,
  password,
}) => bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
  .then((hash) => User.create({
    name,
    email,
    password: hash,
  }))
  .catch((err) => {
    if (err.code === MONGODB_DUPLICATE_ERROR_CODE) {
      throw new ConflictError(t('user_already_exists]'));
    } else {
      throw err;
    }
  });

module.exports.login = ({ email, password }) => User.findUserByCredentials(email, password)
  .then((user) => jwt.sign(
    { _id: user._id },
    ENCRYPTION_KEY,
    { expiresIn: TOKEN_EXPIRE_TIME },
  ))
  .catch((err) => {
    throw new UnauthorizedError(err.message);
  });
