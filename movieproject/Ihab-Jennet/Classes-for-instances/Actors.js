//this class is used to create a new instance when used for fetching in APIServices class

class Actors {
  static BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
  constructor(json) {
    this.id = json.id;
    this.name = json.name;
    this.backdropPath = json.profile_path;
    this.character = json.character;
  }

  get backdropUrl() {
    return this.backdropPath
      ? Actors.BACKDROP_BASE_URL + this.backdropPath
      : "https://pwco.com.sg/wp-content/uploads/2020/05/Generic-Profile-Placeholder-v3.png";
  }
}