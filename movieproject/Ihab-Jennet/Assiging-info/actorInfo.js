//this class calls methods from APIServices class and assigns the retuned
// in variables then passes these variables as paremeters to call other methods

class ActorInfo {
  static async run(person) {
    const actorData = await APIService.fetchActor(person.id);
    const moviesParticipatedInData = await APIService.fetchMoviesActorParticipated(
      person.id
    );
    ActorPage.renderActorSection(actorData, moviesParticipatedInData);
    window.scrollTo(0, 0);
  }
  static async runPopularActors(person) {
    const actorsData = await APIService.popularActors(person);
    ActorsPages.renderActorsSection(actorsData);
    // this makes us scroll top whenever this asynchronous method is called
    window.scrollTo(0, 0);
  }
}
