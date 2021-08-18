const bcrypt = require('bcrypt');
const { MongoError } = require('mongodb');
const jwt = require('jsonwebtoken');

const User = require('../users/user');
const { BCRYPT_SALT_ROUNDS, MONGODB_DUPLICATE_ERROR_CODE, ENCRYPTION_KEY } = require('../../utils/constants');
const { ConflictError } = require('../../utils/errors/ConflictError');
const { UnauthorizedError } = require('../../utils/errors/UnauthorizedError');

const TOKEN_EXPIRE_TIME = 604800;

module.exports.register = (registerContext) => {
  const {
    name,
    email,
    password,
  } = registerContext.getData();

  return bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .catch((err) => {
      if (err instanceof MongoError && err.code === MONGODB_DUPLICATE_ERROR_CODE) {
        throw new ConflictError('Пользователь с таким Email уже существует');
      } else {
        throw err;
      }
    });
};

module.exports.login = (loginUserContext) => {
  const { email, password } = loginUserContext;

  return User.findUserByCredentials(email, password)
    .then((user) => jwt.sign(
      { _id: user._id },
      ENCRYPTION_KEY,
      { expiresIn: TOKEN_EXPIRE_TIME },
    ))
    .catch((err) => {
      throw new UnauthorizedError(err.message);
    });
};
