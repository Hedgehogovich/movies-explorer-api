const router = require('express').Router();

const authRouter = require('./auth');
const moviesRouter = require('./movies');
const usersRouter = require('./users');

const { authMiddleware } = require('../middlewares/auth');
const { notFoundMiddleware } = require('../middlewares/notFound');

router.use(authRouter);
router.use(authMiddleware);
router.use('/movies', moviesRouter);
router.use('/users', usersRouter);
router.use(notFoundMiddleware);

module.exports = router;
