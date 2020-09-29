//this class is used to create a new instance when used for fetching in APIServices class
class Actor {
  static BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
  constructor(json) {
    this.name = json.name;
    this.gender = json.gender;
    this.birthday = json.birthday;
    this.picOfActor = json.profile_path;
    this.actorPopularity = json.popularity;
    this.deathDay = json.deathday;
    this.actorBiography = json.biography;
  }
  get actorGender() {
    return this.gender === 1 ? "Female" : "Male"
  }
 
  get biography() {
    return this.actorBiography ? this.actorBiography : "No information available";
  }
  get profilePath() {
    return this.picOfActor ? Actor.BACKDROP_BASE_URL + this.picOfActor : "https://prod.liveshare.vsengsaas.visualstudio.com/join?57A629D284A67B883361474525C4BB6781D2";
  }
}