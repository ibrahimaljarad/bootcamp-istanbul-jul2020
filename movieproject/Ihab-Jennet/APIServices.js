// This class has methods that are resposible for fetching JSONs from the API.

class APIService {
  static TMDB_BASE_URL = "https://api.themoviedb.org/3";
  static async fetchMovies(arg) {
    const url = APIService._constructUrl(`movie/${arg}`);
    const response = await fetch(url);
    const data = await response.json();
    if (data.results) {
      return data.results.map((movie) => new Movie(movie));
    } else {
      return [new Movie(data)];
    }
  }

  static async fetchSearchResult(input) {
    const url = APIService._constructUrl(`search/multi`) + `&query=${input}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.results.map((result) => new Movie(result));
  }

  static async fetchMoviesByGenres(id) {
    const url =
      APIService._constructUrl(`discover/movie`) + `&with_genres=${id}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.results.map((movie) => new Movie(movie));
  }

  static async popularActors() {
    const url = APIService._constructUrl(`person/popular`);
    const response = await fetch(url);
    const data = await response.json();
    return data.results.map((movie) => new Actors(movie));
  }

  static async fetchMovie(movieId) {
    const url =
      APIService._constructUrl(`movie/${movieId}`) +
      "&append_to_response=videos";
    const response = await fetch(url);
    const data = await response.json();
    return new Movie(data);
  }

  static async fetchActors(movieId) {
    const url = APIService._constructUrl(`movie/${movieId}/credits`);
    const response = await fetch(url);
    const data = await response.json();
    const arrWithActorInfo = [];
    for (let i = 0; i < 5; i++) {
      arrWithActorInfo.push(new Actors(data.cast[i]));
    }
    return arrWithActorInfo;
  }

  static async fetchCrew(movieId) {
    const url = APIService._constructUrl(`movie/${movieId}/credits`);
    const response = await fetch(url);
    const data = await response.json();
    return data.crew.map((crewMember) => new Crew(crewMember));
  }

  static async fetchSimilarMovies(movieId) {
    const url = APIService._constructUrl(`movie/${movieId}/similar`);
    const response = await fetch(url);
    const data = await response.json();
    const arrWithSimilarMovies = [];
    for (let i = 0; i < 5; i++) {
      if (data.results.length > 0) {
        arrWithSimilarMovies.push(new SimilarMovies(data.results[i]));
      } else {
        return arrWithSimilarMovies;
      }
    }
    return arrWithSimilarMovies;
  }

  static async fetchActor(personId) {
    const url = APIService._constructUrl(`person/${personId}`);
    const response = await fetch(url);
    const data = await response.json();
    return new Actor(data);
  }

  static async fetchMoviesActorParticipated(personId) {
    const url = APIService._constructUrl(`person/${personId}/movie_credits`);
    const response = await fetch(url);
    const data = await response.json();
    const arrWithParticipatedMovies = [];
    for (let i = 0; i < 5; i++) {
      if (data.cast.length > 0) {
        arrWithParticipatedMovies.push(new MoviesParticipatedIn(data.cast[i]));
      } else {
        return arrWithParticipatedMovies;
      }
    }
    return arrWithParticipatedMovies;
  }

  static _constructUrl(path) {
    return `${this.TMDB_BASE_URL}/${path}?api_key=${atob(
      "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
    )}`;
  }
}
