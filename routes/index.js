const router = require('express').Router();

const authRouter = require('./auth');
const moviesRouter = require('./movies');
const usersRouter = require('./users');

const { authMiddleware } = require('../middlewares/auth');
const { notFoundMiddleware } = require('../middlewares/notFound');

router.use('/api', authRouter);
router.use(authMiddleware);
router.use('/api/movies', moviesRouter);
router.use('/api/users', usersRouter);
router.use(notFoundMiddleware);

module.exports = router;
