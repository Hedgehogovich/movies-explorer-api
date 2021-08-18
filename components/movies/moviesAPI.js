const router = require('express').Router();

const { authMiddleware } = require('../auth/authMiddleware');
const { Response } = require('../../utils/Response');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('./moviesController');
const { createMovieValidationMiddleware, removeMovieIdValidationMiddleware } = require('./moviesMiddleware');
const { CreateMovieContext } = require('./moviesContexts');

router.get('/', authMiddleware, (req, res, next) => {
  getMovies()
    .then((movies) => res.send(new Response(movies).toObject()))
    .catch(next);
});

router.post('/', authMiddleware, createMovieValidationMiddleware, (req, res, next) => {
  const createMovieContext = new CreateMovieContext(req.body);

  createMovie(createMovieContext)
    .then((movie) => res.send(new Response(movie).toObject()))
    .catch(next);
});

router.delete('/:movieId', authMiddleware, removeMovieIdValidationMiddleware, (req, res, next) => {
  const { movieId } = req.params;
  const userId = req.user._id;

  deleteMovie(movieId, userId)
    .then((movie) => res.send(new Response(movie).toObject()))
    .catch(next);
});

module.exports = router;
