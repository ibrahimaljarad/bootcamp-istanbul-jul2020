// this class has methods that render content in the page
class MovieSection {
  static renderMovie(movie, crew) {
    MoviePage.container.className = "container";
    MoviePage.container.innerHTML = `
    <div class = "backgroundImage m-3 shadow-lg">
      <div class="row"> 
        <div class="col-md-4">
          <img id="movie-backdrop" class="ml-3 mt-3" src=${movie.posterUrl}> 
        </div>
        <div class="col-md-7 ml-2">
          <h1 id="movie-title" class="display-5">${movie.title}</h1>
          <p id="genres-names"></p>
          <p class="h5" id="movie-release-date">Release date: ${movie.releaseDate}</p>
          <p class="h5" id="movie-language">Language: ${movie.language}</p>
          <p class="h5" id="movie-runtime">Runtime: ${movie.runtime}</p>
          <p class="h5" id="movie-rating">Rating: ${movie.rating}</p>
          <p class="h5" id="movie-votecount">Votes received: ${movie.voteCount}</p>
          <p class="h5" id="director"></p>
          <p class="h5">Production companies:</p>
          <div id="companies"></div>
          <h3>Overview:</h3>
          <p id="movie-overview">${movie.overview}</p>
        </div>
      </div>
    </div>
    <div class="embed-responsive w-auto embed-responsive-16by9 m-3">
      <iframe width="560" height="315" src="https://www.youtube.com/embed/${movie.trailerKey}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    <div>
    `;
    const backgroundImage = document.querySelector(".backgroundImage");

    if (
      movie.backdropUrl !==
      "https://betravingknows.com/wp-content/uploads/2017/06/video-movie-placeholder-image-grey.png"
    ) {
      backgroundImage.style.backgroundImage = `
    linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(0,0,0,0.7973564425770308) 63%, rgba(0,0,0,1) 84%),
    url(${movie.backdropUrl})
    `;
      backgroundImage.style.backgroundSize = "cover";
      backgroundImage.style.backgroundRepeat = "no-repeat";
    } else {
      backgroundImage.style.backgroundImage = `
    linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(0,0,0,0.7973564425770308) 90%, rgba(0,0,0,1) 84%)`;
    }
    const genres = document.querySelector("#genres-names");

    for (const genre of movie.genresStrings) {
      const badge = document.createElement("span");
      badge.classList.add("badge", "badge-pill", "badge-danger");
      badge.innerText = genre;
      genres.appendChild(badge);
    }
    for (const crewMember of crew) {
      if (crewMember.directorName) {
        const director = document.querySelector("#director");
        director.innerText = `Director: ${crewMember.directorName}`;
        break;
      }
    }
    const mainDiv = document.createElement("div");
    for (let i = 0; i < movie.companyName.length; i++) {
      const div = document.createElement("div");
      const h5 = document.createElement("h5");
      const img = document.createElement("img");
      mainDiv.classList.add(
        "d-flex",
        "justify-content-around",
        "flex-row",
        "flex-wrap"
      );
      h5.innerText = movie.companyName[i];
      img.classList = "smol";
      img.src = movie.companyLogo[i];
      div.append(h5, img);
      mainDiv.appendChild(div);
      MoviePage.container.appendChild(mainDiv);
    }
    const companies = document.querySelector("#companies");
    companies.appendChild(mainDiv);
  }
}
