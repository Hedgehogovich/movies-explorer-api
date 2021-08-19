const router = require('express').Router();

const { authMiddleware } = require('../middlewares/auth');
const { Response } = require('../utils/Response');

const {
  findOneUser,
  editUser,
} = require('../controllers/users');
const { userEditValidationMiddleware } = require('../middlewares/users');

router.get('/me', authMiddleware, (req, res, next) => {
  const currentUserId = req.user._id;

  findOneUser(currentUserId)
    .then((user) => res.send(new Response(user).toObject()))
    .catch(next);
});
router.patch('/me', authMiddleware, userEditValidationMiddleware, (req, res, next) => {
  const currentUserId = req.user._id;
  const { email, name } = req.body;

  editUser({
    userId: currentUserId,
    email,
    name,
  })
    .then((user) => res.send(new Response(user).toObject()))
    .catch(next);
});

module.exports = router;
