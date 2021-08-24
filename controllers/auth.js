const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { BCRYPT_SALT_ROUNDS, MONGODB_DUPLICATE_ERROR_CODE, ENCRYPTION_KEY } = require('../utils/constants');
const { ConflictError } = require('../utils/errors/ConflictError');
const { t, tKeys } = require('../utils/translate');
const { handleControllerError } = require('../utils/handleControllerError');

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
    const error = err.code === MONGODB_DUPLICATE_ERROR_CODE
      ? new ConflictError(t(tKeys.user_already_exists)) : err;

    handleControllerError(error);
  });

module.exports.login = ({ email, password }) => User.findUserByCredentials(email, password)
  .then((user) => jwt.sign(
    { _id: user._id },
    ENCRYPTION_KEY,
    { expiresIn: TOKEN_EXPIRE_TIME },
  ))
  .catch(handleControllerError);
