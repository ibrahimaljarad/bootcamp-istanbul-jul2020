// this class has methods that render content in the page
class HomePage {
  static container = document.getElementById("container");
  static renderMovies(movies) {
    container.classList.add(
      "d-flex",
      "justify-content-around",
      "flex-row",
      "flex-wrap"
    );
    // movie is a single object from the array of objects "movies"
    this.container.innerHTML = "";
    movies.forEach((movie) => {
      const movieDiv = document.createElement("div");
      const wrapper = document.createElement("div");
      const cards = document.createElement("div");
      const figure = document.createElement("figure");
      const figCaption = document.createElement("figcaption");
      wrapper.className = "wrapper";
      cards.className = "cards";
      figure.className = "card";
      if (movie.genres) {
        for (let i = 0; i < movie.genres.length; i++) {
          const badge = document.createElement("span")
          badge.classList.add(
            "badge",
            "badge-pill",
            "badge-danger"
          );
          badge.innerText = genres[movie.genres[i]]
          figCaption.appendChild(badge)
        }
      }
      if (movie.rating) {
        const badge = document.createElement("span")
      const p = document.createElement("p")
      badge.classList.add(
        "badge",
        "badge-pill",
        "badge-warning"
      );
      badge.innerText = movie.rating
      p.appendChild(badge)
      figCaption.appendChild(p)
      }
      
      movieDiv.classList.add(
        "m-4",
        "w-25",
        "clickable",
        "reveal",
        "movie-card"
      );
      const movieImage = document.createElement("img");
      movieImage.src = `${
        movie.posterUrl ? movie.posterUrl : movie.backdropUrl
      }`;
      movieImage.style.width = "18rem";
      const movieTitle = document.createElement("h3");
      movieTitle.textContent = `${movie.title ? movie.title : movie.name}`;

      movieDiv.addEventListener("click", function () {
        if (movie.title) {
          MoviesInfo.run(movie);
        } else {
          ActorInfo.run(movie);
        }
      });
      figure.append(movieImage, figCaption);
      cards.appendChild(figure);
      wrapper.appendChild(cards);
      movieDiv.appendChild(wrapper);
      movieDiv.appendChild(movieTitle);
      this.container.appendChild(movieDiv);
      ScrollReveal().reveal(".reveal", {
         duration: 750,
        });
    });
  }
}
