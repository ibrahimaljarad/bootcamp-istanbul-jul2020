//this class is used to create a new instance when used for fetching in APIServices class

class SimilarMovies {
  static BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
  constructor(json) {
    this.id = json.id;
    this.title = json.title;
    this.backdropPath = json.poster_path;
  }
  get backdropUrl() {
    return this.backdropPath ? Crew.BACKDROP_BASE_URL + this.backdropPath : "https://betravingknows.com/wp-content/uploads/2017/06/video-movie-placeholder-image-grey.png";
  }
}
