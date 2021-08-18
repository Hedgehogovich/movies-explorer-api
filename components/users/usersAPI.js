const router = require('express').Router();

const { authMiddleware } = require('../auth/authMiddleware');
const { UserEditContext } = require('./usersContexts');
const { Response } = require('../../utils/Response');

const {
  findOneUser,
  editUser,
} = require('./usersController');
const { userEditValidationMiddleware } = require('./usersMiddlewares');

router.get('/me', authMiddleware, (req, res, next) => {
  const currentUserId = req.user._id;

  findOneUser(currentUserId)
    .then((user) => res.send(new Response(user).toObject()))
    .catch(next);
});
router.patch('/me', authMiddleware, userEditValidationMiddleware, (req, res, next) => {
  const { name, email } = req.body;
  const editUserContext = new UserEditContext({ name, email });

  editUser(editUserContext)
    .then((user) => res.send(new Response(user).toObject()))
    .catch(next);
});

module.exports = router;
