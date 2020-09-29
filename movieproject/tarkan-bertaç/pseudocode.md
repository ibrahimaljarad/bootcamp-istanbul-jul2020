v3 key = 50263a781de21add754e80576984b3e5
v4 key = eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MDI2M2E3ODFkZTIxYWRkNzU0ZTgwNTc2OTg0YjNlNSIsInN1YiI6IjVmNDY1OTdlMmRhODQ2MDAzNTNhMTA3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2PRcBQE1T2huO_A2ZGHUJuRoUDylaYFLnkS4nticl8c


add a way to go back


Function List
    - movie/tv details
        - Movie poster Movie title Movie release date Movie runtime Movie description The movie language trailer The movie production company name and logo The director name  movie rating vote count
            https://api.themoviedb.org/3/movie/{movie-id}?api_key=50263a781de21add754e80576984b3e5&language={lang-here}

            https://api.themoviedb.org/3/movie/157336?api_key={api_key}&append_to_response={things you want}

            -- tek class
            -- parametreye göre tv veya movie verisini alır
            -- parametreye göre dil değiştirir
            -- id parametresi olacak
            -- key içine gömülü olacak
            -- videos,images
            -- additional response
            
        - The main 5 actors of the movies in the credit section, cast section
            https://api.themoviedb.org/3/movie/{movie-id}/credits?api_key=50263a781de21add754e80576984b3e5

        - A related movies section which includes at least five     related movies
            https://api.themoviedb.org/3/movie/{movie_id}/similar?api_key=50263a781de21add754e80576984b3e5&language=en-US&page=1

            https://api.themoviedb.org/3/movie/{movie-id}/recommendations?api_key=50263a781de21add754e80576984b3e5&language={lang}&page=1
          

        - movie reviews
            https://api.themoviedb.org/3/movie/11/reviews?api_key=50263a781de21add754e80576984b3e5&language=en-US&page=1
        

   
    - filter func 
        - https://developers.themoviedb.org/3/discover/movie-discover

    - genre listing 
        -https://api.themoviedb.org/3/genre/movie/list?api_key=50263a781de21add754e80576984b3e5&language=en-US

        - https://api.themoviedb.org/3/genre/tv/list?api_key=50263a781de21add754e80576984b3e5&language=en-US

    - rating sys
        https://developers.themoviedb.org/3/movies/rate-movie
        https://developers.themoviedb.org/3/movies/delete-movie-rating

    - single actor details
        https://api.themoviedb.org/3/person/{person_id}?api_key=50263a781de21add754e80576984b3e5&language=en-US

    - actor list
        popularity
        https://api.themoviedb.org/3/person/popular?api_key=50263a781de21add754e80576984b3e5&language=en-US&page=1

    - movie-id finder
        - https://api.themoviedb.org/3/search/movie?api_key={api_key}&query={user-input}
        https://api.themoviedb.org/3/movie?api_key=50263a781de21add754e80576984b3e5&query=mission+impossible


    - image 
        https://image.tmdb.org/t/p/{w500 or other size}/

    - add lang to site 
        i18next

    -kalıp fetch linki olustur . dependent yerlere variable  koy .seçime göre çeşitlilik sağla 



1-) find these info from tryout
2-) create functions for similiar tasks
3-) make function fetch data
4-) put data on screen and stlye it


grandparent 
 details metodu 
 detailsin outputunu kullanarak popularity yi veren bir method
 detailsin.... .....

2 tane parent yarat movie ve tv






 - search bar movie/tv/actor etc exact match or close matches
        https://api.themoviedb.org/3/movie/{id}?api_key={api_key}

