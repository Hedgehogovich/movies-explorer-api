const router = require('express').Router();

const { Response } = require('../utils/Response');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const { createMovieValidationMiddleware, removeMovieIdValidationMiddleware } = require('../middlewares/movies');

router.get('/', (req, res, next) => {
  getMovies(req.user._id)
    .then((movies) => res.send(new Response(movies).toObject()))
    .catch(next);
});

router.post('/', createMovieValidationMiddleware, (req, res, next) => {
  createMovie({
    ...req.body,
    owner: req.user._id,
  })
    .then((movie) => res.send(new Response(movie).toObject()))
    .catch(next);
});

router.delete('/:movieId', removeMovieIdValidationMiddleware, (req, res, next) => {
  const { movieId } = req.params;
  const currentUserId = req.user._id;

  deleteMovie({ movieId, currentUserId })
    .then((movie) => res.send(new Response(movie).toObject()))
    .catch(next);
});

module.exports = router;
