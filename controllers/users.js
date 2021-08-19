const User = require('../models/user');

module.exports.findOneUser = (userId) => User.findById(userId)
  .orFail();

module.exports.editUser = ({ userId, email, name }) => User.findByIdAndUpdate(
  userId,
  { email, name },
  {
    new: true,
    runValidators: true,
  },
)
  .orFail();
