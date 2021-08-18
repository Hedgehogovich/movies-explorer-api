const BCRYPT_SALT_ROUNDS = 10;
const MONGODB_DUPLICATE_ERROR_CODE = 11000;
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const FRONTEND_ORIGIN = process.env.FRONTEND_URL || 'http://localhost:3001';
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'some-secret-key';
const JWT_SESSION_NAME = 'jwt';

module.exports = {
  BCRYPT_SALT_ROUNDS,
  MONGODB_DUPLICATE_ERROR_CODE,
  FRONTEND_ORIGIN,
  IS_PRODUCTION,
  ENCRYPTION_KEY,
  JWT_SESSION_NAME,
};
