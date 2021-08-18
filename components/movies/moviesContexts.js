class CreateMovieContext {
  constructor({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  }) {
    this.country = country;
    this.director = director;
    this.duration = duration;
    this.year = year;
    this.description = description;
    this.image = image;
    this.trailer = trailer;
    this.nameRU = nameRU;
    this.nameEN = nameEN;
    this.thumbnail = thumbnail;
    this.movieId = movieId;
  }

  getData() {
    return {
      country: this.country,
      director: this.director,
      duration: this.duration,
      year: this.year,
      description: this.description,
      image: this.image,
      trailer: this.trailer,
      nameRU: this.nameRU,
      nameEN: this.nameEN,
      thumbnail: this.thumbnail,
      movieId: this.movieId,
    };
  }
}

module.exports = { CreateMovieContext };
