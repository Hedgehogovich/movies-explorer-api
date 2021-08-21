const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const validator = require('validator');

const { t } = require('../utils/translate');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: (props) => t('field_is_incorrect_email', [props.value]),
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  __v: {
    type: Number,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error(t('incorrect_email_or_password')));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error(t('incorrect_email_or_password')));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
