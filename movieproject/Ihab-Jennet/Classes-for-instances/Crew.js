//this class is used to create a new instance when used for fetching in APIServices class

class Crew {
  static BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
  constructor(json) {
    this.name = json.name;
    this.job = json.job;
    this.backdropPath = json.profile_path;
  }

  get directorName() {
    let name;
    if (this.job === "Director") {
      name = this.name;
    }
    return name;
  }

  get backdropUrl() {
    return this.backdropPath ? Crew.BACKDROP_BASE_URL + this.backdropPath : "";
  }
}