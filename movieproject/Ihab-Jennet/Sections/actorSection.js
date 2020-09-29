// this class has methods that render content in the page

class ActorSection {
  static renderActor(person, participatedMovies) {
    ActorPage.container.innerHTML = `
    <div class="row">
      <div class="col-md-4">
        <img src="${person.profilePath}" class="singleActorPic" class="ml-3 mt-3">
      </div>
      <div class="col-md-6 ml-2">
        <h1>${person.name}</h1>
        <p><span class="textInGray">Gender:</span> ${person.actorGender}</p>
        <p class= "b-day"><span class="textInGray">Born:</span> ${person.birthday}</p>
        <p><span class="textInGray">Popularity:</span> ${person.actorPopularity}</p>
      </div>
    </div>
    <div class="row">
      <div class="col-md-11 sm-6">
        <h5 style="color: #feac41; margin-top: 15px">Biography</h5>
        <p>${person.biography}</p>
      </div>
    </div>
    `;
    if (person.deathDay) {
      const birthday = document.querySelector(".b-day");
      birthday.insertAdjacentHTML(
        "afterend",
        `<p><span style="color: gray">Died:</span> ${person.deathDay}</p>`
      );
    }

    if (participatedMovies.length > 0) {
      const mainDiv = document.createElement("div");
      mainDiv.classList.add(
        "d-flex",
        "justify-content-around",
        "flex-row",
        "flex-wrap"
      );
      for (let i = 0; i < participatedMovies.length; i++) {
        const div = document.createElement("div");
        div.className = "clickable";
        const participatedMovieImg = document.createElement("img");
        participatedMovieImg.src = participatedMovies[i].backdropUrl;
        participatedMovieImg.className = "participatedMovie";
        const participatedMovieTitle = document.createElement("h5");
        participatedMovieTitle.innerText = participatedMovies[i].title;
        participatedMovieTitle.style.maxWidth = "13rem";
        participatedMovieTitle.style.color = "#feac41";
        div.append(participatedMovieImg, participatedMovieTitle);
        mainDiv.appendChild(div);
        ActorPage.container.appendChild(mainDiv);
        participatedMovieImg.addEventListener("click", function () {
          MoviesInfo.run(participatedMovies[i]);
        });
      }
    } else {
      const participatedMovieTitle = document.createElement("p");
      participatedMovieTitle.innerText = `<p>No movies participated!</p>`;
      ActorPage.container.appendChild(participatedMovieTitle);
    }
  }
}
