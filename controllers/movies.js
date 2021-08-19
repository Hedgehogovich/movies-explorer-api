const Movie = require('../models/movie');
const { ForbiddenError } = require('../utils/errors/ForbiddenError');
const { t } = require('../utils/translate');

module.exports.getMovies = () => Movie.find({})
  .sort('-createdAt');

module.exports.createMovie = (movieData) => Movie.create(movieData);

module.exports.deleteMovie = ({ movieId, currentUserId }) => Movie.findById(movieId)
  .orFail()
  .then((movie) => {
    if (movie.owner.toString() !== currentUserId) {
      throw new ForbiddenError(t('no_rights_for_remove'));
    }

    return Movie.findByIdAndRemove(movieId).orFail();
  });
