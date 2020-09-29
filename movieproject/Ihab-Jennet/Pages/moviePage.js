// this class calls methods to render content on the page

class MoviePage {
  static container = document.getElementById("container");
  static renderMovieSection(movie, actors, crew, similarMovies) {
    MovieSection.renderMovie(movie, crew);
    ActorsSection.renderMovieActors(actors);
    SimilarMoviesSection.renderSimilarMovies(similarMovies);
  }
}