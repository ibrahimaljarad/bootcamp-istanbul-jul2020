class ActorsSection {
  static renderMovieActors(actors) {
    const actorsContainer = document.createElement("div");
    const header = document.createElement("h3");
    header.innerText = "Actors:"
    actorsContainer.classList.add("d-flex", "justify-content-around", "flex-wrap")
    MoviePage.container.appendChild(header);
    for (const actor of actors) {
      const singleActor = document.createElement("div");
      const img = document.createElement("img");
      const h4 = document.createElement("h4");
      const small = document.createElement("p");
      img.src = actor.backdropUrl;
      img.className = "round"
      singleActor.classList.add("actor-photo", "clickable")
      h4.innerText = actor.name;
      small.innerText = `As ${actor.character}`
      singleActor.append(img, h4);
      if (actor.character) {
        singleActor.append(img, h4, small);
      }
      actorsContainer.appendChild(singleActor);
      MoviePage.container.appendChild(actorsContainer);

      singleActor.addEventListener("click", () => {
        ActorInfo.run(actor);
      });
      ScrollReveal().reveal(singleActor, {
        delay: 100,
        distance: "150%",
        origin: "bottom",
        opacity: null,
      });
    }
    
  }
}