//this class calls methods from APIServices class and assigns the retuned
// in variables then passes these variables as paremeters to call other methods
class MoviesInfo {
  static async run(movie) {
    const movieData = await APIService.fetchMovie(movie.id);
    const actorData = await APIService.fetchActors(movie.id);
    const crewData = await APIService.fetchCrew(movie.id);
    const similarMoviesData = await APIService.fetchSimilarMovies(movie.id);
    MoviePage.renderMovieSection(
      movieData,
      actorData,
      crewData,
      similarMoviesData
    );
    // this makes us scroll top whenever this asynchronous method is called
    window.scrollTo(0, 0)
  }
}