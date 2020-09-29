//the API documentation site https://developers.themoviedb.org/3/

class App {
    static async run() {
        const movies = await APIService.fetchMultiple("movie", "now_playing")
        HomePage.renderHomepageContent(movies);
        HomePage.renderNav()

    }
}


// Beginning of API Service
class APIService {
    static TMDB_BASE_URL = 'https://api.themoviedb.org/3';

    //creates base url for fethces
    static _constructUrl(path, append = "", item = "") {
        return `${this.TMDB_BASE_URL}/${path}?api_key=${'50263a781de21add754e80576984b3e5'}${append + item}`;
    }
    static async fetchMultiple(type = "movie", path) {
        const url = APIService._constructUrl(`${type}${path ? "/" + path : ""}`)
        const response = await fetch(url)
        const data = await response.json()
        if (type === "genre/movie/list" || type === "genre/tv/list") {
            return data.genres
        }
        else {
            const detailedData = data.results.map(async each => await this.fetchSingle(type, each.id))
            return Promise.all(detailedData)
        }

    }

    // fetches single person/tv/movie
    static async fetchSingle(type, id = "") {
        let output = ""
        const url = APIService._constructUrl(`${type}/${id}`, "&append_to_response=", "videos,reviews,credits,similar,combined_credits")
        const response = await fetch(url)
        const data = await response.json()
        if (type === "tv") {
            output = new TV(data)
        }
        else if (type === "movie") {
            output = new Movie(data)
        }
        else {
            output = new Person(data)
        }

        return output
    }

    //search by string
    static async search() {
        const searchInput = document.getElementById("searchBox").value
        const searchStr = searchInput.trim().replace(" ", "+")
        const queryUrl = APIService._constructUrl("search/multi") + `&query=${searchStr}` + `&page=1&include_adult=false`
        const queryResponse = await fetch(queryUrl)
        const queryData = await queryResponse.json()

        const detailedQueryData = queryData.results.map(async each => {
            if (each.media_type === "tv" || each.media_type === "movie") {
                return await this.fetchSingle(each.media_type, each.id)
            }
            else {
                return await APIService.fetchSingle("person", each.id)
            }
        })
        return Promise.all(detailedQueryData)
    }


    //Filtered search function
    static async fetchFilter(releaseDate = "", genreId = "", path = "movie", sortBy = "popularity.desc", with_cast = "") {
        const constructorUrl = APIService._constructUrl(`discover/${path}`)
        const sort = `&sort_by=${sortBy}`
        const genre = genreId === "" ? "" : `&with_genres=${genreId}`
        const release = releaseDate === "" ? "" : `&release_date.lte=${releaseDate}`
        const withCast = with_cast === "" ? "" : `&with_people=${with_cast}`
        const url = constructorUrl + release + genre + sort + "&include_video=true" + withCast
        const response = await fetch(url)
        const data = await response.json()
        const detailedData = data.results.map(async each => this.fetchSingle(path, each.id))
        return Promise.all(detailedData)
    }


}
// End of API Service




// Beginning of homepage
class HomePage {
    static arrMovies = "";
    static container = document.getElementById('container');

    // Beginning of NAV renderer
    static async renderNav() {
        const popularStars = document.getElementById("popularStars")
        const about = document.getElementById("about")
        const searchButton = document.getElementById("searchButton")
        const dateInput = document.getElementById("example-date-input")
        const releaseDateRadio = document.getElementById("releaseDate")
        const filterSearchButton = document.getElementById("filterSearch")
        const filterRadioPaths = document.getElementsByClassName("path")
        const filterRadioTypes = document.getElementsByClassName("type")


        //Beginning of filter button 
        filterSearchButton.addEventListener("click", async (a) => {


            let path = ""
            let type = ""
            let data = ""

            a.preventDefault()

            for (const each of filterRadioTypes) {
                if (each.checked) {
                    type = each.value


                }
            }

            for (const each of filterRadioPaths) {
                if (each.checked) {
                    path = each.id

                }
            }

            if (path === "releaseDate") {
                path = dateInput.value
                data = await APIService.fetchFilter(path, "", type, "release_date.desc")
                HomePage.renderHomepageContent(data)
            }
            else if (type === "tv") {

                if (path === "now_playing") {
                    data = await APIService.fetchMultiple(type, "airing_today")
                }
                else if (path === "upcoming") {
                    data = await APIService.fetchMultiple(type, "on_the_air")
                }
                else {
                    data = await APIService.fetchMultiple(type, path)
                }
                HomePage.renderHomepageContent(data)

            }
            else {
                data = await APIService.fetchMultiple(type, path)
                HomePage.renderHomepageContent(data)
            }

        })
        //End of filter button 

        //Makes clicking on calendar also click on radio
        dateInput.addEventListener("click", (e) => {
            releaseDateRadio.click()
        })


        //Beginning genre dropdown generator
        const genreDropdown = async (type) => {
            const navBarEl = type === "tv" ? document.getElementById("tv-dropdown") : document.getElementById("movie-dropdown")
            const genresArr = await APIService.fetchMultiple(`genre/${type}/list`, "")
            for (const each of genresArr) {
                navBarEl.innerHTML += `<a class="dropdown-item ${type}-genre" id=${each.id} href="#">${each.name}</a>`
            }

            const genreClasses = document.getElementsByClassName(`${type}-genre`)

            for (const each of genreClasses) {
                each.addEventListener("click", async () => {
                    const result = await APIService.fetchFilter("", `${each.id}`, type, "popularity.desc")
                    HomePage.renderHomepageContent(result)
                })
            }
        }
        //End genre dropdown generator
        genreDropdown("movie")
        genreDropdown("tv")


        //Beginning of about page
        about.addEventListener("click", (e) => {
            this.container.className = ""
            this.container.innerHTML = `
            <div id="aboutt" class="container p-5 my-5">
            <h3>About</h3>
            <p> Lorem ipsum  Quisque id tellus euismod, interdum mi ac, mattis ligula. Ut scelerisque luctus ex, sit amet aliquet tortor faucibus sed. Suspendisse dignissim augue leo, quis varius tellus lobortis quis. Ut vehicula id tellus nec congue. Duis pharetra massa vitae congue luctus. Mauris a semper nunc, eu lobortis ante. Morbi tempor, lectus in varius porta, est erat imperdiet magna, id molestie felis erat non eros. Nullam tellus ligula, rhoncus in tempus in, finibus vitae felis. Donec aliquam fermentum aliquam. Phasellus elementum, purus nec eleifend interdum, libero neque varius tellus, in volutpat nunc sem ac elit. Aliquam ornare posuere iaculis. Quisque sit amet libero iaculis, dictum ligula at, placerat enim. Etiam egestas quam dictum, lacinia libero eu, euismod felis. Morbi feugiat vulputate odio id pretium. Nunc rutrum auctor velit.  </p>
            <p> Lorem ipsum  Quisque id tellus euismod, interdum mi ac, mattis ligula. Ut scelerisque luctus ex, sit amet aliquet tortor faucibus sed. Suspendisse dignissim augue leo, quis varius tellus lobortis quis. Ut vehicula id tellus nec congue. Duis pharetra massa vitae congue luctus. Mauris a semper nunc, eu lobortis ante. Morbi tempor, lectus in varius porta, est erat imperdiet magna, id molestie felis erat non eros. Nullam tellus ligula, rhoncus in tempus in, finibus vitae felis. Donec aliquam fermentum aliquam. Phasellus elementum, purus nec eleifend interdum, libero neque varius tellus, in volutpat nunc sem ac elit. Aliquam ornare posuere iaculis. Quisque sit amet libero iaculis, dictum ligula at, placerat enim. Etiam egestas quam dictum, lacinia libero eu, euismod felis. Morbi feugiat vulputate odio id pretium. Nunc rutrum auctor velit.  </p>
            <p> Lorem ipsum  Quisque id tellus euismod, interdum mi ac, mattis ligula. Ut scelerisque luctus ex, sit amet aliquet tortor faucibus sed. Suspendisse dignissim augue leo, quis varius tellus lobortis quis. Ut vehicula id tellus nec congue. Duis pharetra massa vitae congue luctus. Mauris a semper nunc, eu lobortis ante. Morbi tempor, lectus in varius porta, est erat imperdiet magna, id molestie felis erat non eros. Nullam tellus ligula, rhoncus in tempus in, finibus vitae felis. Donec aliquam fermentum aliquam. Phasellus elementum, purus nec eleifend interdum, libero neque varius tellus, in volutpat nunc sem ac elit. Aliquam ornare posuere iaculis. Quisque sit amet libero iaculis, dictum ligula at, placerat enim. Etiam egestas quam dictum, lacinia libero eu, euismod felis. Morbi feugiat vulputate odio id pretium. Nunc rutrum auctor velit.  </p>
            </div>`
        })
        //End of about page

        //Beginning of searh button evt list
        searchButton.addEventListener("click", async function (e) {
            e.preventDefault()
            const results = await APIService.search()
            HomePage.renderHomepageContent(results)
        })
        //End of searh button evt list

        //Beginning of popularstars button evt list
        popularStars.addEventListener("click", async (e) => {
            e.preventDefault()
            const popularStars = await APIService.fetchMultiple("person", "popular")
            HomePage.renderHomepageContent(popularStars)
        })
        //End of popularstars button evt list
    }
    // End of NAV rendere

    // Beginning of home page content renderer
    static renderHomepageContent(arr) {
        this.container.innerHTML = ""
        this.container.className = ""
        this.container.className += " row mx-auto justify-content-center my-5"
        arr.forEach(async el => {
            const elImage = document.createElement("img");
            const elTitle = document.createElement("h3");
            const elDiv = document.createElement("div");
            const elVideo = document.createElement("div")

            elDiv.className += " card col-10 col-sm-4 col-md-4 col-xl-3  px-2 pt-4 m-5"
            elDiv.style.width = "20rem"
            elTitle.className += " text-center"
            elImage.className += " img-fluid p-2 mb-2 rounded"
            elVideo.className += " text-center"

            elDiv.appendChild(elTitle);
            elDiv.appendChild(elImage)
            elDiv.appendChild(elVideo)
            this.container.appendChild(elDiv);

            //Beginning of content deciding
            let type = ""
            if (el.constructor.name === "TV") {
                type = "tv"
            }
            else if (el.constructor.name === "Movie") {
                type = "movie"
            }
            else {
                type = "person"
            }
            //End of content deciding

            //Beginning of TV Movie content

            elTitle.innerHTML = `<a href="#">${el.title || el.name || el.original_name} ${el.releaseDate ? "(" + el.releaseDate.split("-")[0] + ")" || "(" + el.firstAirDate.split("-")[0] + ")" : ""
                }</a> `;
            elImage.src = el.backdropUrl
            el.tagline ? elDiv.innerHTML += `<p class="text-center p-0 m-0">${el.tagline}</p>` : ""


            //change mouse curson on hover
            elDiv.addEventListener("mouseover", (e) => {
                e.target.style.cursor = "pointer";
            })


            // Beginning of rating
            if (el.constructor.name === "TV" || el.constructor.name === "Movie") {
                elDiv.innerHTML += "<h5 class='text-center mt-2'>Rating</h5>"
                elDiv.innerHTML += `<div class="progress mx-auto mb-4">
            <div class="progress-bar" id=${el.id} role="progressbar" style="width: ${el.vote * 10}%" aria-valuenow="${el.vote ? el.vote : "?"}" aria-valuemin="0" aria-valuemax="10">${el.vote ? el.vote : "?"} / 10</div>
          </div>`
                const progress = document.getElementById(el.id)
                if (el.vote < 5) {
                    progress.style.background = "light blue"
                }

                else if (el.vote >= 5 && el.vote < 6) {
                    progress.style.background = "rgb(255, 32, 33)" //red
                }
                else if (el.vote >= 6 && el.vote < 7) {
                    progress.style.background = "rgb(255, 192, 0)" //orange
                }
                else if (el.vote >= 7 && el.vote < 8) {
                    progress.style.background = "rgb(254, 252, 3)" //yellow
                }
                else if (el.vote >= 8 && el.vote < 9) {
                    progress.style.background = "rgb(177, 222, 129)" // light green

                }
                else {
                    progress.style.background = "rgb(0, 254, 114)" //bright green
                }
            }
            // End of rating





            //Beginning of  Popover
            18
            const genreStr = el.genres ? "Genres: " + el.genres.map(x => x.name).join(", ") : "Known for: " + el.known_for_department
            const data = `${el.overview ? `Overview: ${el.overview}\n\n` : ""}${el.also_known_as ? "Also Known As: " + el.also_known_as + "\n\n" : ""}${el.popularity ? "Popularity Score: " + el.popularity : ""}`
            elDiv.setAttribute("data-placement", "right")
            elDiv.setAttribute("data-toggle", "popover")
            elDiv.setAttribute("data-trigger", "hover")
            elDiv.setAttribute("title", genreStr)
            elDiv.setAttribute("data-content", data)



            $(function () {
                $('[data-toggle="popover"]').popover({
                    trigger: 'hover',
                    html: true,
                    sanitize: true,

                })
            })
            //Removes popover on click
            this.container.addEventListener("click", (e) => {
                const pops = document.getElementsByClassName("popover")
                for (const each of pops) {

                    const previousPop = document.getElementById(each.id)
                    previousPop.style.display = "none"
                }
            })


            //End of Popover

            elTitle.addEventListener("click", e => {
                elDiv.click()
            })

            elImage.addEventListener("click", (e) => {
                elDiv.click()
            })
            //adds evt list to cards
            elDiv.addEventListener("click", function () {
                if (type === "person") {

                    PersonSection.renderPerson(el)
                } else {
                    MovieSection.renderMovie(el)
                }
            });
        })
        //End of Person content

    }
    // End of home page content renderer
}
// End of homepage

class Movies {
    static async run(media) {
        const mediaData = await APIService.fetchSingle("movie", media.id)
        MoviePage.renderMovieSection(mediaData);

    }
}

class PersonPage {
    static container = document.getElementById("container")
    static renderPersonSection(person) {
        PersonSection.renderPerson(person);
    }
}
class MoviePage {
    static container = document.getElementById('container');
    static renderMovieSection(media) {
        MovieSection.renderMovie(media);
    }
}



//Beginning of single person page
class PersonSection {
    static async renderPerson(person) {
        PersonPage.container.innerHTML = `
    <div class= "row">
        <div class="col-md-4">
        
        
            <img class="img-fluid" id="media-backdrop" src=${person.backdropUrl}> 
            <ul class="mt-4" id="person-gender">Gender: ${person.gender == 2 ? "Male" : "Female"}</ul>
                <ul id="person-birthday">${person.birthday ? "Birthdate: " + person.birthday : "Unknown"}</ul>
                <ul id="person-deathday">${person.deathday ? "Date of Death: " + person.deathday : ""}</ul>
                <ul id="person-birthplace">Birthplace: ${person.place_of_birth ? person.place_of_birth : "Unknown"}</ul>
            <ul  id="person-known-for">${person.known_for_department ? "Known for: " + person.known_for_department : ""}</ul>
        <ul  id="person-famous-roles">${person.also_known_as ? "Also known as: " + person.also_known_as : ""}</ul>
            <ul  id="person-popularity">Popularity score: ${person.popularity ? person.popularity : "Unknown"}</ul>
        </div>
            <div class="col-md-8">
            <h2  id="person-name">${person.name}</h2>
                <h3>Biography</h3>
                <ul id="person-biography">${person.biography ? person.biography : "Unknown"}</ul>
                
                <h3>${person.name}'s Other Works:</h3>
                <ul id="person-movie-list"></ul>

                




            </div>
        </div>
`;
        PersonPage.container.className = ""
        PersonPage.container.className += " container personPage my-5 p-5"

        const personOtherWorkUl = document.getElementById("person-movie-list")
        const personOtherWork = document.getElementsByClassName("personOtherWork")
        //Beginning of person's other works
        const workArr = []
        if (person.cast.length > 0 || person.crew.length > 0) {
            if (person.cast.length > 0)
                person.cast.forEach(eachCredit => {
                    workArr.push(eachCredit)
                    //personOtherWorkUl.innerHTML += `<li class="personOtherWork" id = "${eachCredit.id} ${eachCredit.media_type}"> <a href="#">${eachCredit.title || eachCredit.name}</a></li > `

                })

            if (person.crew.length > 0) {
                person.crew.forEach(eachCredit => {
                    workArr.push(eachCredit)
                    //personOtherWorkUl.innerHTML += `<li class="personOtherWork" id = "${eachCredit.id} ${eachCredit.media_type}"> <a href="#">${eachCredit.title || eachCredit.name}</a></li > `
                })
            }
            //

            if (workArr.length > 25) {
                personOtherWorkUl.innerHTML = `
                <div class="accordion" id="accordionExample">
  <div class="card">
    <div class="card-header" id="headingOne">
      <h2 class="mb-0">
        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          Click here to see all
        </button>
      </h2>
    </div>

    <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
      <ul class="card-body" id="collapsible list">
      </ul>
    </div>
  </div>
                `
                const collapsible = document.getElementById("collapsible list")
                workArr.forEach(eachCredit => {
                    collapsible.innerHTML += `<li class="personOtherWork" id = "${eachCredit.id} ${eachCredit.media_type}"> <a href="#">${eachCredit.title || eachCredit.name}</a></li>`
                })
            } else {
                workArr.forEach(eachCredit => {
                    personOtherWorkUl.innerHTML += `<li class="personOtherWork" id = "${eachCredit.id} ${eachCredit.media_type}"> <a href="#">${eachCredit.title || eachCredit.name}</a></li>`
                })
            }

            for (const eachClass of personOtherWork) {
                eachClass.addEventListener("click", async (e) => {
                    const data = await APIService.fetchSingle(eachClass.id.split(" ")[1], parseInt(eachClass.id.split(" ")[0])) //?
                    MovieSection.renderMovie(data)
                })
            }
        }
        else {
            personOtherWorkUl.innerHTML = "<p>Unknown</p>"
        }

        //End of person's other works
    }
}
//End of single person page


// Beginning of single movie page
class MovieSection {
    static async renderMovie(media) {

        MoviePage.container.innerHTML = `
    <div class= "row">
        <div class="col-md-4">
            <img class="img-fluid" id="media-backdrop" src=${media.backdropUrl}>
            
            <h5 class="mt-4">${media.tagline ? media.tagline : ""}</h5>
            <h5 id="homePage-header"></h5>
                <ul id="tvWebLink"></ul>
                <ul id="genres">Genres: </ul>
                
                <ul id="media-release-date">${media.releaseDate ? "<li>Release Date: " + media.releaseDate + "</li>" : ""}</ul>
                <ul>${media.firstAirDate ? "<li> First Air Date: " + media.firstAirDate + "</li>" : ""}</ul>
                <ul id="media-runtime">${media.runtime ? "<li>Runtime: " + media.runtime + " minutes</li>" : ""}</ul>
                <ul id="media-runtime">${media.episodeRunTime ? "<li>Runtime: " + media.episodeRunTime + " minutes per episode</li>" : ""}</ul>
                <ul id="media-lang">${media.language ? "<li> Original Language " + media.language.toUpperCase() + "</li>" : ""}</ul>
                <ul id="media-vote"><li>Avg Vote: ${media.vote ? media.vote : "Unknown"} (${media.voteCount ? media.voteCount : "Unknown"})</li> </ul>
                <ul><li>Popularity Score: ${media.popularity ? media.popularity : "Unknown"}</li></ul>
                <ul>${media.budget ? "<li>Budget: " + media.budget + "$</li>" : ""} </ul>
                <ul>${media.revenue ? "<li>Revenue: " + media.revenue + "$</li>" : ""}</ul>
                <h4>Cast:</h4>
                <ul id="cast"></ul>
                <h4 id="createdBy-header"></h4>
                <ul id="createdBy"></ul>
                <h4 id="director-header">Director(s)</h4>
                <ul id="media-director"></ul>
                <h4 id="exec-header">Executive Producer(s)</h4>
                <ul id="media-execProducers"></ul>
                <h4 id="networks-header"></h4>
                <ul id="networks"></ul>
                <h4>Production Companies</h4>
                <ul id="production-company"></ul>
                <h4>Similar:</h4>
                <ul id="similar-medias"></ul>
        </div>
            <div class="col-md-8">
                <h1 id="media-title">${media.title || media.name}</h2>
                <h3 class="mt-3">Overview:</h3>
                <ul id="media-overview"><li>${media.overview ? media.overview : "Unknown"}</li></ul>
                <h4>Trailers</h4>
                <ul id="trailers"></ul>
                
                
                
                <h4 id="seasons-header"></h4>
                <ul id="seasons"></ul>
                <h4>Reviews</h4>
                <ul id="reviews"></ul>
            </div>
        </div>
`;
        MoviePage.container.className = ""
        MoviePage.container.className += " container moviePage my-5 p-5"
        const execProducers = document.getElementById("media-execProducers")
        const reviews = document.getElementById("reviews")
        const similarList = document.getElementById("similar-medias")
        const directorName = document.getElementById("media-director")
        const cast = document.getElementById("cast")
        const genres = document.getElementById("genres")
        const trailers = document.getElementById("trailers")
        const productionCompany = document.getElementById("production-company")
        const similarClass = document.getElementsByClassName("similar")
        const people = document.getElementsByClassName("person")
        const type = media.constructor.name === "TV" ? "tv" : "movie"
        const seasonsHeader = document.getElementById("seasons-header");
        const seasons = document.getElementById("seasons");
        const createdByHeader = document.getElementById("createdBy-header");
        const createdBy = document.getElementById("createdBy");
        const tvWebLink = document.getElementById("tvWebLink");
        const networksHeader = document.getElementById("networks-header");
        const networks = document.getElementById("networks");
        //Beginning of genre list
        if (media.genres.length > 0) {
            for (const eachGenre of media.genres) {
                genres.innerText += ` ${eachGenre.name}`
            }
        }
        else {
            genres.innerText += " Unknown"
        }
        //End of genre list

        //Beginning of Video list
        if (media.videos.length > 0) {
            for (const eachTrailer of media.videos) {
                console.log(eachTrailer)
                if (eachTrailer.type === "Trailer") {
                    trailers.innerHTML += `<li class="my-3">
    <div class="embed-responsive embed-responsive-16by9">
        <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/${eachTrailer.key}" allowfullscreen></iframe>
    </div>
                </li > `
                }
            }
        }
        if (trailers.innerHTML === "") {
            trailers.innerHTML = "<li>No trailers yet!</li>"
        }
        //End of Video list

        //Beginning of Production Company List
        if (media.productionCompanies.length > 0) {
            for (const eachComp of media.productionCompanies) {
                if (eachComp.logo_path) {
                    productionCompany.innerHTML += `<li> <h5>${eachComp.name}</h5><img class="img-fluid my-3" src="http://image.tmdb.org/t/p/original${eachComp.logo_path}" width=100px ></li > `

                } else {
                    productionCompany.innerHTML += `<li> <h5>${eachComp.name}</h5></li > `
                }
            }
        }
        else {
            productionCompany.innerHTML = "<li>Unknown</li>"
        }
        //End of Production company list

        //Beginning of Directors
        if (media.crew.length > 0) {
            const directors = media.crew.filter(x => x.job == "Director")
            if (directors.length > 0) {
                directors.forEach(each => {
                    each.job === "Director" ? directorName.innerHTML += `<li class="person" id=${each.id}><a href="#">${each.name}</a></li>` : ""
                })
            }
            else {
                directorName.innerHTML = "<li>Unknown</li>"
            }
        } else {
            directorName.innerHTML = "<li>Unknown</li>"
        }
        //End of Director

        // Beginning of Executive Producers
        if (media.crew.length > 0) {
            const execProducer = media.crew.filter(x => x.job == "Executive Producer")
            if (execProducer.length > 0) {
                execProducer.forEach(each => {
                    each.job === "Executive Producer" ? execProducers.innerHTML += `<li class="person" id=${each.id}><a href="#">${each.name}</a></li` : ""
                })
            }
            else {
                execProducers.innerHTML = "<li>Unknown</li>"
            }
        }
        else {
            execProducers.innerHTML = "<li>Unknown</li>"
        }
        // End of Executive Producers

        // Beginning of Movie Cast
        if (media.cast.length > 0) {
            media.cast.forEach(each => {
                cast.innerHTML += `<li class="person" id = "${each.id}" > <a href="#">${each.name}</a> as ${each.character}</li> `
            })
        }
        else {
            cast.innerHTML = "<li>Unknown</li>"
        }
        //End of Movie Cast



        //Beginning of Similar list
        if (media.similar.length > 0) {
            media.similar.map(each => {
                similarList.innerHTML += `<li class="similar" id = "${each.id}" path = "${each.constructor.name}" > <a href="#">${each.title || each.name}</a></li> `
            })
        }
        else {
            similarList.innerHTML = "<li>There is nothing like it!</li>"
        }


        for (const each of similarClass) {
            each.addEventListener("click", async e => {
                const data = await APIService.fetchSingle(type, each.id)
                MovieSection.renderMovie(data)
            })
        }

        //End of Similar list

        //Beginning of Review list
        if (media.reviews.length > 0) {
            for (const eachReview of media.reviews) {
                reviews.innerHTML += `<li>
    <h6>${eachReview.author}</h6>
    <p>${eachReview.content}</p>
                    </li > `
            }
        }
        else {
            reviews.innerHTML = `<li> No reviews yet!</li>`
        }
        //End of Review list
        // Beginnig of Season List
        if (media.seasons) {
            seasonsHeader.innerText = "Seasons:"
            media.seasons.forEach(season => {
                seasons.innerHTML += `<li>${season.name} - ${season.air_date}, ${season.episode_count} episode(s).</li>`
            })
            // <br>${season.overview ? "Overview: " + season.overview : ""}
        }
        // End of Season List

        // Beg. of Created By
        if (media.createdBy) {
            createdByHeader.innerText = "Created By:"
            media.createdBy.forEach(creator => {
                createdBy.innerHTML += `<li class="person" id="${creator.id}"> <a href=#> ${creator.name}</a> </li>`
            })
        }
        // End of Created By

        // Beg. of Tv Website Link   // <h4>Home Page</h4>
        if (media.homePage) {

            tvWebLink.innerHTML = `<li><a href=${media.homePage} target="_blank">Home Page</a></li>`;
        }
        // End pf Tv Website Link

        //Beg. of Networks
        if (media.networks) {
            networksHeader.innerText = "Networks:"
            media.networks.forEach(network => {
                networks.innerHTML = `<li><img class="my-4" src="http://image.tmdb.org/t/p/original${network.logo_path}" width=100px ></li>`
            })
        }
        // End of Networks



        //Beginning of people evt list
        for (const each of people) {
            each.addEventListener("click", async (e) => {
                const data = await APIService.fetchSingle("person", each.id)
                PersonPage.renderPersonSection(data)
            })
        }
        //End of people evt list

    }

}

// End of sinlge movie page


// Beginning of movie class
class Movie {
    static BACKDROP_BASE_URL = 'http://image.tmdb.org/t/p/w780';

    constructor(json) {
        this.id = json.id;
        this.title = json.title;
        this.releaseDate = json.release_date
        this.homePage = json.homepage
        this.runtime = json.runtime;
        this.overview = json.overview;
        this.backdropPath = json.backdrop_path
        this.poster_path = json.poster_path
        this.genres = json.genres;
        this.productionCompanies = json.production_companies;
        this.language = json.original_language;
        this.vote = json.vote_average;
        this.voteCount = json.vote_count;
        this.name = json.name
        this.media_type = json.media_type
        this.budget = json.budget
        this.popularity = json.popularity
        this.createdBy = json.created_by
        this.revenue = json.revenue
        this.status = json.status
        this.tagline = json.tagline
        this.reviews = json.reviews !== undefined ? json.reviews.results : ""
        this.videos = json.videos !== undefined ? json.videos.results : ""
        this.cast = json.credits !== undefined ? json.credits.cast : ""
        this.crew = json.credits !== undefined ? json.credits.crew : ""
        this.similar = json.similar !== undefined ? json.similar.results : ""
    }

    get backdropUrl() {
        if (this.backdropPath) {
            return Movie.BACKDROP_BASE_URL + this.backdropPath
        }
        else if (this.poster_path) {
            return Movie.BACKDROP_BASE_URL + this.poster_path
        }
        else {
            return "output-onlinepngtools.png"
        }
    }
}
// End of movie class

// Beginning of tv class
class TV {
    static BACKDROP_BASE_URL = 'http://image.tmdb.org/t/p/w780';
    constructor(json) {
        this.id = json.id;
        this.firstAirDate = json.first_air_date
        this.episodeRunTime = json.episode_run_time;
        this.overview = json.overview;
        this.backdropPath = json.backdrop_path
        this.poster_path = json.poster_path
        this.genres = json.genres;
        this.homePage = json.homepage
        this.inProduction = json.in_production
        this.languages = json.languages
        this.lastAirDate = json.last_air_date
        this.lastEpisodeToAir = json.last_episode_to_air
        this.numEpisodes = json.number_of_episodes
        this.numSeasons = json.number_of_seasons
        this.popularity = json.popularity
        this.seasons = json.seasons
        this.productionCompanies = json.production_companies;
        this.language = json.original_language;
        this.vote = json.vote_average;
        this.voteCount = json.vote_count;
        this.name = json.name
        this.media_type = json.media_type
        this.episodeRunTime = json.episode_run_time
        this.networks = json.networks
        this.createdBy = json.created_by
        this.status = json.status
        this.reviews = json.reviews !== undefined ? json.reviews.results : ""
        this.videos = json.videos !== undefined ? json.videos.results : ""
        this.cast = json.credits !== undefined ? json.credits.cast : ""
        this.crew = json.credits !== undefined ? json.credits.crew : ""
        this.similar = json.similar !== undefined ? json.similar.results : ""
    }

    get backdropUrl() {
        if (this.backdropPath) {
            return Movie.BACKDROP_BASE_URL + this.backdropPath
        }
        else if (this.poster_path) {
            return Movie.BACKDROP_BASE_URL + this.poster_path
        }
        else {
            return "output-onlinepngtools.png"
        }
    }
}
// End of movie class


// Beginning of person class
class Person {
    static BACKDROP_BASE_URL = 'http://image.tmdb.org/t/p/w780';
    constructor(json) {
        this.id = json.id;
        this.name = json.name;
        this.birthday = json.birthday;
        this.deathday = json.deathday;
        this.biography = json.biography;
        this.place_of_birth = json.place_of_birth;
        this.profile_path = json.profile_path;
        this.known_for_department = json.known_for_department;
        this.also_known_as = json.also_known_as;
        this.popularity = json.popularity;
        this.gender = json.gender;
        this.cast = json.combined_credits !== undefined ? json.combined_credits.cast : ""
        this.crew = json.combined_credits !== undefined ? json.combined_credits.crew : ""
    }
    get backdropUrl() {
        return this.profile_path ? Person.BACKDROP_BASE_URL + this.profile_path : "output-onlinepngtools.png";
    }
}

// End of movie class


document.addEventListener("DOMContentLoaded", App.run);



//resp
//tablet col ayarla
//tel col ayarla
// card size
// html comment yaz
// parametreler için açıklama yaz
// geri butonu
// page number
//
