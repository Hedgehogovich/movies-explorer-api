const router = require('express').Router();

const { Response } = require('../../utils/Response');
const { register, login } = require('./authController');
const { authLoginValidationMiddleware, authRegisterValidationMiddleware } = require('./authMiddleware');
const { LoginContext, RegisterContext } = require('./authContext');

router.post('/signin', authLoginValidationMiddleware, (req, res, next) => {
  const loginContext = new LoginContext(req.body);

  login(loginContext)
    .then((token) => res.send(new Response(token).toObject()))
    .catch(next);
});
router.post('/signup', authRegisterValidationMiddleware, (req, res, next) => {
  const registerContext = new RegisterContext(req.body);

  register(registerContext)
    .then(() => res.send(new Response({ message: 'Вы успешно зарегистрированы!' }).toObject()))
    .catch(next);
});

module.exports = router;
