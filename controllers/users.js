const User = require('../models/user');
const { handleControllerError } = require('../utils/handleControllerError');

module.exports.findOneUser = (userId) => User.findById(userId)
  .orFail()
  .catch(handleControllerError);

module.exports.editUser = ({ userId, email, name }) => User.findByIdAndUpdate(
  userId,
  { email, name },
  {
    new: true,
    runValidators: true,
  },
)
  .orFail()
  .catch(handleControllerError);
