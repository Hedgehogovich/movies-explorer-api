const Movie = require('./movie');
const { ForbiddenError } = require('../../utils/errors/ForbiddenError');

module.exports.getMovies = () => Movie.find({})
  .sort('-createdAt');

module.exports.createMovie = (createMovieContext) => Movie.create(createMovieContext.getData());

module.exports.deleteMovie = (movieId, currentUserId) => Movie.findById(movieId)
  .orFail()
  .then((movie) => {
    if (movie.owner.toString() !== currentUserId) {
      throw new ForbiddenError('У вас нет прав на удаление данного фильма');
    }

    return Movie.findByIdAndRemove(movieId).orFail();
  });
