const User = require('./user');

module.exports.findOneUser = (userId) => User.findById(userId).orFail();

module.exports.editUser = (userId, editUserContext) => User.findByIdAndUpdate(
  userId,
  editUserContext.getData(),
  {
    new: true,
    runValidators: true,
  },
)
  .orFail();
