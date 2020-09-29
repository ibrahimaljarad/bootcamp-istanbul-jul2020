// this class calls methods to render content on the page

class ActorPage {
  static container = document.getElementById("container");
  //our new fetch service method
  static renderActorSection(person, participatedMovies) {
    ActorPage.container.className = "container w-75";
    ActorSection.renderActor(person, participatedMovies);
  }
}
