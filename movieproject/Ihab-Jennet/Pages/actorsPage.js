// this class calls methods to render content on the page

class ActorsPage {
    static container = document.getElementById("container");
    //our new fetch service method
    static renderActorsSection(person) {
      this.container.innerHTML = '';
      ActorsSection.renderMovieActors(person);
    }
  }