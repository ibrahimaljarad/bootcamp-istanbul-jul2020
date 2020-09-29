//this class is used to create a new instance when used for fetching in APIServices class
class Movie {
  static BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
  constructor(json) {
    this.id = json.id;
    this.name = json.name; //for search actor
    this.title = json.title;
    this.language = json.original_language;
    this.genres = json.genre_ids;
    this.genresNames = json.genres;
    this.releaseDate = json.release_date;
    this.runtime = json.runtime + " minutes";
    this.overview = json.overview;
    this.backdropPath = json.backdrop_path;
    this.posterPath = json.poster_path;
    this.productionCompany = json.production_companies;
    this.rating = json.vote_average;
    this.voteCount = json.vote_count;
    this.picOfActor = json.profile_path;
    this.json = json;
  }

  get trailerKey() {
    return this.json.videos.results[0] ? this.json.videos.results[0].key : "";
  }
  get genresStrings() {
    if (this.genresNames) {
      const genres = [];
      for (let i = 0; i < this.genresNames.length; i++) {
        genres.push(this.genresNames[i].name);
      }
      return genres;
    }
  }
  get companyLogo() {
    let logoPic = [];
    for (const logo of this.productionCompany) {
      if (logo.logo_path !== null) {
        logoPic.push(Movie.BACKDROP_BASE_URL + logo.logo_path);
      } else {
        logoPic.push("");
      }
    }
    return logoPic;
  }

  get companyName() {
    let companyNames = [];
    for (const company of this.productionCompany) {
      companyNames.push(company.name);
    }
    return companyNames;
  }
  get backdropUrl() {
    if (this.backdropPath) {
      return Movie.BACKDROP_BASE_URL + this.backdropPath;
    } else if (this.picOfActor) {
      return Movie.BACKDROP_BASE_URL + this.picOfActor;
    } else {
      return "https://betravingknows.com/wp-content/uploads/2017/06/video-movie-placeholder-image-grey.png";
    }
  }
  get posterUrl() {
    return this.posterPath ? Movie.BACKDROP_BASE_URL + this.posterPath : "";
  }
}


