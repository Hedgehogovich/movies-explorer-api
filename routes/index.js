const router = require('express').Router();

const authRouter = require('./auth');
const moviesRouter = require('./movies');
const usersRouter = require('./users');

router.use(authRouter);
router.use('/movies', moviesRouter);
router.use('/users', usersRouter);

module.exports = router;
