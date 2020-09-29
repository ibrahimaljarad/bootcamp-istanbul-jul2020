// this class has methods that render content in the page
class SimilarMoviesSection {
  static renderSimilarMovies(similarMovies) {
    if (similarMovies.length > 0) {
      const mainDiv = document.createElement("div");
      mainDiv.classList.add(
        "d-flex",
        "justify-content-around",
        "flex-row",
        "flex-wrap"
      );
      // in this loop for every element in the array similarMovies
      // we are creating <mainDiv> ==> <div> ==> 
      // <similarMovieImg><similarMovieTitle>
      for (let i = 0; i < similarMovies.length; i++) {
        const div = document.createElement("div");
        div.className = "clickable";
        const similarMovieImg = document.createElement("img");
        similarMovieImg.src = similarMovies[i].backdropUrl;
        similarMovieImg.className = "similarMovie";
        const similarMovieTitle = document.createElement("h5");
        similarMovieTitle.style.color = "#feac41";
        similarMovieTitle.innerText = similarMovies[i].title;
        div.append(similarMovieImg, similarMovieTitle);
        mainDiv.appendChild(div);
        MoviePage.container.appendChild(mainDiv);

        ScrollReveal().reveal(div, {
          delay: 100,
          distance: "150%",
          origin: "bottom",
          opacity: null,
        });
        
        similarMovieImg.addEventListener("click", function () {
          MoviesInfo.run(similarMovies[i]);
        });
      }
    } else {
      const similarMovieTitle = document.createElement("h4");
      similarMovieTitle.innerText = `There are no similar movies`;
      MoviePage.container.appendChild(similarMovieTitle);
    }
  }
}
