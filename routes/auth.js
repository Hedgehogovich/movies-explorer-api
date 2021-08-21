const router = require('express').Router();

const { Response } = require('../utils/Response');
const { register, login } = require('../controllers/auth');
const { authLoginValidationMiddleware, authRegisterValidationMiddleware } = require('../middlewares/auth');
const { t } = require('../utils/translate');

router.post('/signin', authLoginValidationMiddleware, (req, res, next) => {
  login(req.body)
    .then((token) => res.send(new Response(token).toObject()))
    .catch(next);
});
router.post('/signup', authRegisterValidationMiddleware, (req, res, next) => {
  register(req.body)
    .then(() => res.send(new Response({ message: t('success_registration') }).toObject()))
    .catch(next);
});

module.exports = router;
