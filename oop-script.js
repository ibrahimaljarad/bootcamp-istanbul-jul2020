//the API documentation site https://developers.themoviedb.org/3/

//APP RENDERS MOVIE AT HOMEPAGE
class App { 
    static async run() {
        const movies = await APIService.fetchMovies()
        HomePage.renderMovies(movies);
            const genreList = await APIService.fetchGenres()
          GenresMovies.renderGenres(genreList);
    }
  

  static async runSearch(string) {
    const searchResult = await APIService.fetchSearchResult(string);
    HomePage.renderMovies(searchResult)
  }

  static async runPopularMovies(movies) {
    const popularmovies = await APIService.fetchPopularMovies(movies);
    HomePage.renderMovies(popularmovies)
  }

static async runTopRatedMovies(movies) {
    const topRatedmovies = await APIService.fetchTopRatedMovies(movies);
    HomePage.renderMovies(topRatedmovies)
  }
  
  static async runUpcomingMovies(movies) {
    const upcomingmovies = await APIService.fetchUpcomingMovies(movies);
    HomePage.renderMovies(upcomingmovies)
  }
}


//APISERVICE FETCHES NOW PLAYING MOVIES DATA AND RETURN RESULTS
class APIService {
    static TMDB_BASE_URL = 'https://api.themoviedb.org/3';
    static async fetchMovies() {
        const url = APIService._constructUrl(`movie/now_playing`)
        const response = await fetch(url)
        const data = await response.json()
        //console.log(data);
        return data.results.map(movie => new Movie(movie))    
    }

    // Fetches Popular
    static async fetchPopularMovies() {
        const url = APIService._constructUrl(`movie/popular`)
        const response = await fetch(url)
        const data = await response.json()
        //console.log(data);
        return data.results.map(movie => new Movie(movie))        
    }
    // movie/top_rated
     static async fetchTopRatedMovies() {
        const url = APIService._constructUrl(`movie/top_rated`)
        const response = await fetch(url)
        const data = await response.json()
        //console.log(data);
        return data.results.map(movie => new Movie(movie)) 
    }

    // movie/upcoming
    static async fetchUpcomingMovies() {
        const url = APIService._constructUrl(`movie/upcoming`)
        const response = await fetch(url)
        const data = await response.json()
        //console.log(data);
        return data.results.map(movie => new Movie(movie)) 
    }

    //Fetches SINGLE Movie Data
    static async fetchMovie(movieId) {
        const url = APIService._constructUrl(`movie/${movieId}`)
        const response = await fetch(url)
        const data = await response.json()
        //  console.log("moveiDATA" , data);      
        return new Movie(data)
    }
 
    //Fetches SINGLE Movie Credits (Actors,Director,etc.)
    static async fetchCredits(movieId) {
        const url = APIService._constructUrl(`movie/${movieId}/credits`)
        const response = await fetch(url)
        const data = await response.json()
          
       
        // console.log(data.cast)
          return data.cast.map(actor => new Actor(actor))         
        // return new Actors(data)
    }

//Fetches POPULAR ACTORS data
     static async fetchActors() {
        const url = APIService._constructUrl(`person/popular`)
        const response = await fetch(url)
        const data = await response.json()
        
         return data.results.map(person => new Actor(person))
       
    }

   static async fetchActor(personId) {
             
        const url = APIService._constructUrl(`person/${personId}`)
        const response = await fetch(url)
        const data = await response.json()
        return  new Actor(data)
       
    }

    static async fetchGenres() {
        const url = APIService._constructUrl(`genre/movie/list`)
        const response = await fetch(url)
        const data = await response.json()
        // console.log(data);
       return data.genres
    }

     static async fetchDiscover(genreId) {
        
        const url = APIService._constructUrl
        (`discover/movie`) + `&with_genres=${genreId}`;
        const response = await fetch(url)
        const data = await response.json()
       return data.results.map(movie => new Genre(movie))
    }

 static async fetchSearchResult(input) {
    const url = APIService._constructUrl(`search/multi`) + `&query=${input}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data.results.map((result) => new Movie(result));
  }


   //creates a path for the data  
  static _constructUrl(path) {
        return `${this.TMDB_BASE_URL}/${path}?api_key=${atob('NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI=')}`;       
    }    
}

//HOMEPAGE RENDER(Movies)&DOM
class HomePage {   
    static container = document.getElementById('container');
    static renderMovies(movies) {
        movies.forEach(movie => {
          
          
            const movieDiv = document.createElement("div");
            movieDiv.classList.add("movie-divs");
            const imageDiv = document.createElement("div");
            imageDiv.classList.add("image-divs");
            const movieImage = document.createElement("img");
            movieImage.classList.add("img-fluid");
            movieImage.classList.add("rounded");
            movieImage.src = `${movie.backdropUrl}`;
            const movieTitle = document.createElement("h3");
            movieTitle.textContent = `${movie.title}`;
            const movieContent=document.createElement("div");
             movieContent.classList.add("content");
            const movieOverview=document.createElement("div");
            movieOverview.classList.add('movie-overview');
            movieOverview.textContent=`${movie.overview}`;
            const movieRating=document.createElement("p");
            movieRating.classList.add("movie-ratings");
            movieRating.textContent=`⭐${movie.rateAverage}/10, ${movie.rateCount} votes`;
            movieImage.addEventListener("click", function() {
              ActorsPage.containerActor.innerHTML = ""
                Movies.run(movie);
            });

            movieDiv.appendChild(imageDiv);
            movieDiv.appendChild(movieTitle);
            imageDiv.appendChild(movieImage);
            movieDiv.appendChild(movieRating);
            imageDiv.appendChild(movieContent);
            movieContent.appendChild(movieOverview);
            this.container.appendChild(movieDiv);
            
        })
    }   
}

//MOVIES RUN ASYNC SINGLE MOVIE PAGE(MOVIEPAGE)
class Movies {
    static async run(movie) {
        const movieData = await APIService.fetchMovie(movie.id)
        
        const movieActors = await APIService.fetchCredits(movie.id)
        
        MoviePage.renderMovieSection(movieData,movieActors);
           
    }
    
}

//SINGLE MOVIE PAGE(MOVIEPAGE) Connected with MOVIESECTION
class MoviePage {
    static container = document.getElementById('container');
    static renderMovieSection(movie,actors) {
        MovieSection.renderMovie(movie,actors);
    }
    
}

//MOVIESECTION Connected with SINGLE MOVIE PAGE(MOVIEPAGE)
//Includes InnerHTML of SINGLE MOVIE PAGE
class MovieSection {
    static renderMovie(movie, actors) {
      const LIMIT_ACTORS = 5;
      
      const htmlActors = []
      for(let i = 0 ; i < LIMIT_ACTORS;i++ ){
        htmlActors.push(`<span>${actors[i].name}, </span>`);
      }
       
        MoviePage.container.innerHTML = `
       
      
        <div class="col-md-4">
          <img  class="img-fluid float-left max-width:20rem rounded" id="movie-backdrop" src=${movie.backdropUrl}> 
        </div>
        <div class="col-md-8">
          <h2 id="movie-title">${movie.title}</h2>
          <p id="movie-rate">⭐${movie.rateAverage}/10, ${movie.rateCount} votes</p>
          <p id="genres">${movie.genres}</p>
          <span id="movie-release-date">${movie.releaseDate}</span>
          <span id="movie-runtime">| ${movie.runtime}</span>
         <span id="original_language">| ${movie.language}</span>
         </div>
          <div>
          <h3>Overview:</h3>
          <p id="movie-overview">${movie.overview}</p>
            <h4 id ="movieActors">Actors:</h4>
            ${htmlActors.join("")}
          <p><b>Production Co:</b>${movie.companies}</p>
        </div>
      
    
    `;
    }
}

//CREATES OBJECTS INSIDE OF SINGLE MOVIE PAGE
class Movie {
    static BACKDROP_BASE_URL = 'http://image.tmdb.org/t/p/w780';
    constructor(json) {
          //console.log(json) 
        this.id = json.id;
        this.title = json.title;
        this.genres = "";
        for( let i in json.genres){
            this.genres += json.genres[i].name + " "; }
        this.releaseDate = json.release_date;
        this.runtime = json.runtime + " minutes";
        this.overview = json.overview;
        this.backdropPath = json.backdrop_path;
        this.backdropposter = json.poster_path
        this.language=json.original_language;
     
        this.companies="";
        for (let i in json.production_companies){
        this.companies+=json.production_companies[i].name +", ";}
        this.rateAverage=json.vote_average;
        this.rateCount=json.vote_count;
        
    }
    get backdropUrl() {
        return this.backdropPath ? Movie.BACKDROP_BASE_URL + this.backdropPath || this.backdropposter : "";
    }
     
}
//ACTORS PAGE RENDER&DOM
class ActorsPage {
    static containerActor = document.getElementById('container');
    static renderActors(actors) {
      //  console.log(people)
       actors.forEach(actor => {  
            const actorDiv = document.createElement("div");
            actorDiv.classList.add("actors-divs");
            const actorImage = document.createElement("img");
            actorImage.classList.add("img-fluid-actors");
            actorImage.src = `${actor.backdropUrlActors}`;
            const actorName = document.createElement("h3");
            actorName.textContent = `${actor.name}`;
             actorImage.addEventListener("click", function() {
                 Actors.runActor(actor);
                 
             });

            actorDiv.appendChild(actorName);
            actorDiv.appendChild(actorImage);
            this.containerActor.appendChild(actorDiv);
        })
    }
}


//RUN ASYNC SINGLE ACTOR PAGE(MOVIEPAGE)
class Actors {
    static async run(person) {
        const actorData = await APIService.fetchActors()
         ActorsPage.renderActors(actorData);
    }
    static async runActor(person) {
    const actorData = await APIService.fetchActor(person.id);
    ActorsSection.renderActor(actorData);
  } 
 
}

//ACTORS SECTION Connected with SINGLE ACTOR PAGE
//Includes InnerHTML of SINGLE ACTOR PAGE
class ActorsSection {
    static renderActor(actor) {
        
        ActorsPage.containerActor.innerHTML = `
      
        <div class="col-md-4">
          <img  class="img-fluid float-left rounded" id="actor-backdrop" src=${actor.backdropUrlActors}> 
        </div>
        <div class="col-md-4">
          <h2 id="actor-name">${actor.name}</h2>
          <p id="actor-gender"><b>Gender:</b>${actor.gender}</p>
           <p id="actor-birthday"><b>Birthday:</b>${actor.birthday}</p>
          <p id="actor-popularity"><b>Popularity:</b>${actor.popularity}</p>
          </div>
          <div>
          <h3>Biography:</h3>
          <p id="actor-biography">${actor.biography}</p>
        </div>
     
      
      
    `;
    }
}

//CREATES OBJECTS INSIDE OF SINGLE ACTOR PAGE
class Actor {
    static BACKDROP_BASE_URL = 'http://image.tmdb.org/t/p/w780';
    constructor(json) {
        this.id = json.id;
        this.name = json.name;
        this.gender = json.gender;
        this.birthday = json.birthday;
        this.popularity = json.popularity;
        this.biography = json.biography;
        this.backdropPath = json.profile_path;
        this.deathday=json.deathday;
        
    }
    get backdropUrlActors() {
        return this.backdropPath ? Actor.BACKDROP_BASE_URL + this.backdropPath : "";
    }
     
}

//NAVBAR HOME BUTTON FUNCTIONALITY
const  homeButton = document.getElementById("homeButton");
homeButton.addEventListener("click", function(){
   if (true){
      MoviePage.container.innerHTML = ""
      ActorsPage.containerActor.innerHTML = ""
      GenrePage.containerGenre.innerHTML = ""
      App.run()
   }
});

//NAVBAR ACTORS BUTTON FUNCTIONALITY
const  actorsButton = document.getElementById("actorsButton");
actorsButton.addEventListener("click", function(){
   if (true){
      MoviePage.container.innerHTML = ""
      ActorsPage.containerActor.innerHTML = ""
      Actors.run()
   }
});

class GenresMovies{
static  renderGenres(genres){
  const genresNames= document.getElementById("dropdown-genres") 
  genresNames.innerHTML = genres.map(genre => {
    return `<a class="dropdown-item buttons" id=${genre.id} href="#">${genre.name}</a>`
  }).join("")    
   const genresDiscover=[...document.querySelectorAll(".buttons")]
   const genreSelect = genresDiscover.map( genre => {
             genre.addEventListener("click",  async(e)  =>{
              const movieData = await APIService.fetchDiscover(genre.id)
                console.log(movieData)
                MoviePage.container.innerHTML = ""
                 ActorsPage.containerActor.innerHTML = ""
                 GenrePage.containerGenre.innerHTML = ""
                          Genres.run(movieData)
 })
   })
     
  }
  }

class Genre{
  static BACKDROP_BASE_URL = 'http://image.tmdb.org/t/p/w780';
    constructor(json) {
          console.log(json) 
        this.id = json.id;
        this.title = json.title;
        this.genres = "";
        for( let i in json.genres){
            this.genres += json.genres[i].name + " "; }
        this.backdropPath = json.backdrop_path;
         
    }
    get backdropUrl() {
        return this.backdropPath ? Genre.BACKDROP_BASE_URL + this.backdropPath : "";
    }
}

class GenrePage {
    static containerGenre = document.getElementById('container');
    static renderDiscover(genres) {
      
       genres.forEach(genre => {
         
            const genreDiv = document.createElement("div");
            genreDiv.classList.add("movie-divs");
            const genreImage = document.createElement("img");
            genreImage.classList.add("img-fluid");
            genreImage.src = `${genre.backdropUrl}`;
            const genreName = document.createElement("h3");
            genreName.textContent = `${genre.title}`;
            
             genreImage.addEventListener("click", function() {
                 Genres.run(genre);
                 
             });

            genreDiv.appendChild(genreName);
            genreDiv.appendChild(genreImage);
            this.containerGenre.appendChild(genreDiv);
        })
    }
}
class Genres {
    static async run(genre) {
         GenrePage.renderDiscover(genre);  
              
    }
}

class ResultsPage{
   
static containerResult = document.getElementById('container');
    static renderResults(results) {
      //  console.log(people)
       results.forEach(result => { 
         
            const resultDiv = document.createElement("div");
            const resultImage = document.createElement("img");
            resultImage.src = `${result.backdropUrl}` ;
            const resultName = document.createElement("h3");
            resultName.textContent = `${result.title}`  
            
             resultImage.addEventListener("click", function() {
                 Results.run(result);                
             });
            resultDiv.appendChild(resultName);
            resultDiv.appendChild(resultImage);
            this.container.appendChild(resultDiv);
         })
    }
}


class Results {
    static async run(result) {
        const resultData = await APIService.fetchResults()
      
        ResultsPage.renderResults(resultData);      
    }
}

//Event Listeners for Search 
const searchBtn = document.querySelector("#searchButton");
const searchInput = document.querySelector("#inputValue");

searchBtn.addEventListener("click", (e) => {
  e.preventDefault()
  App.runSearch(searchInput.value)
  MoviePage.container.innerHTML = ""
  ActorsPage.containerActor.innerHTML = ""
  GenrePage.containerGenre.innerHTML = ""

});

//Event Listeners for Filter

//popular
const filterPopular = document.querySelector("#popular-movies");
filterPopular .addEventListener("click", (e) => {
  e.preventDefault()
  App.runPopularMovies()
  MoviePage.container.innerHTML = ""
  ActorsPage.containerActor.innerHTML = ""
  GenrePage.containerGenre.innerHTML = ""

});

//now-playing
const filterNowPlaying = document.querySelector("#now-playing");
filterNowPlaying.addEventListener("click", (e) => {
  e.preventDefault()
  App.run()
  MoviePage.container.innerHTML = ""
  ActorsPage.containerActor.innerHTML = ""
  GenrePage.containerGenre.innerHTML = ""

});

//upcoming-movies
const filterUpcoming = document.querySelector("#upcoming-movies");
filterUpcoming.addEventListener("click", (e) => {
  e.preventDefault()
  App.runUpcomingMovies()
  MoviePage.container.innerHTML = ""
  ActorsPage.containerActor.innerHTML = ""
  GenrePage.containerGenre.innerHTML = ""

});

//toprated-movies
const filterTopRated = document.querySelector("#toprated-movies");
filterTopRated.addEventListener("click", (e) => {
  e.preventDefault()
  App.runTopRatedMovies()
  MoviePage.container.innerHTML = ""
  ActorsPage.containerActor.innerHTML = ""
  GenrePage.containerGenre.innerHTML = ""

});

//RUNS APP after DOMContent Loaded
document.addEventListener("DOMContentLoaded", App.run);
