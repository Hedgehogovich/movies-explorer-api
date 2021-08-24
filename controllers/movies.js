const Movie = require('../models/movie');
const { ForbiddenError } = require('../utils/errors/ForbiddenError');
const { t, tKeys } = require('../utils/translate');
const { handleControllerError } = require('../utils/handleControllerError');

module.exports.getMovies = (userId) => Movie.find({ owner: userId })
  .sort('-createdAt');

module.exports.createMovie = (movieData) => Movie.create(movieData);

module.exports.deleteMovie = ({ movieId, currentUserId }) => Movie.findById(movieId)
  .orFail()
  .then((movie) => {
    if (movie.owner.toString() !== currentUserId) {
      throw new ForbiddenError(t(tKeys.no_rights_for_movie_remove));
    }

    return Movie.findByIdAndRemove(movieId).orFail();
  })
  .catch(handleControllerError);
