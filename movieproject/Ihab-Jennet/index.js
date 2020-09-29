//the API documentation site https://developers.themoviedb.org/3/

class App {
  static async run(arg = "now_playing") {
    const movies = await APIService.fetchMovies(arg);
    HomePage.renderMovies(movies);
  }

  static async runGenres(id) {
    const movies = await APIService.fetchMoviesByGenres(id);
    HomePage.renderMovies(movies);
  }

  static async runPopularActors() {
    const popularActors = await APIService.popularActors();
    ActorsPage.renderActorsSection(popularActors);
  }

  static async runSearch(string) {
    const searchResult = await APIService.fetchSearchResult(string);
    HomePage.renderMovies(searchResult);
  }
  static runAboutPage() {
    AboutPage.renderAboutPage();
  }
}
// selectors
const topRated = document.querySelector("#topRated");
const popular = document.querySelector("#popular");
const releaseDate = document.querySelector("#releaseDate");
const upcoming = document.querySelector("#Upcoming");
const nowPlaying = document.querySelector("#nowPlaying");
const genresMenu = document.querySelector("#genres");
const actorList = document.querySelector("#actorList");
const homePage = document.querySelector("#homePage");
const searchBtn = document.querySelector("#search-btn");
const searchInput = document.querySelector("#search-input");
const aboutPage = document.querySelector("#about");

let genres = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};
// event listeners
genresMenu.addEventListener("click", (e) => {
  App.runGenres(e.target.id);
});

aboutPage.addEventListener("click", (e) => {
  App.runAboutPage();
});

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  App.runSearch(searchInput.value);
  searchInput.value = "";
});

homePage.addEventListener("click", (e) => {
  App.run();
});

actorList.addEventListener("click", (e) => {
  App.runPopularActors();
});

topRated.addEventListener("click", (e) => {
  App.run("top_rated");
});

popular.addEventListener("click", (e) => {
  App.run("popular");
});

releaseDate.addEventListener("click", (e) => {
  App.run("latest");
});

upcoming.addEventListener("click", (e) => {
  App.run("upcoming");
});

nowPlaying.addEventListener("click", (e) => {
  App.run("now_playing");
});

window.scrollTo(0, 0);
document.addEventListener("DOMContentLoaded", (e) => {
  App.run();
});

// switch (e.target.id) {
//   case "action":
//     App.runGenres("28");
//     break;
//   case "sci-fi":
//     App.runGenres("878");
//     break;
//   case "adeventure":
//     App.runGenres("12");
//     break;
//   case "animation":
//     App.runGenres("16");
//     break;
//   case "comedy":
//     App.runGenres("35");
//     break;
//   case "crime":
//     App.runGenres("80");
//     break;
//   case "documentary":
//     App.runGenres("99");
//     break;
//   case "drama":
//     App.runGenres("18");
//     break;
//   case "fantasy":
//     App.runGenres("14");
//     break;
//   case "history":
//     App.runGenres("36");
//     break;
//   case "family":
//     App.runGenres("10751");
//     break;
//   case "horror":
//     App.runGenres("27");
//     break;
//   case "music":
//     App.runGenres("10402");
//     break;
//   case "mystery":
//     App.runGenres("9648");
//     break;
//   case "romance":
//     App.runGenres("10749");
//     break;
//   case "tv-movie":
//     App.runGenres("10770");
//     break;
//   case "thriller":
//     App.runGenres("53");
//     break;
//   case "war":
//     App.runGenres("10752");
//     break;
//   case "western":
//     App.runGenres("37");
//     break;
// }
