let movies;

async function getMovies(search) {
    movies = await fetch(`https://www.omdbapi.com/?s=${search}&apikey=a91ed9b`)
    let moviesJson = await movies.json();
    pushHTML(moviesJson)
}

function pushHTML(moviesJson) {
    let imgBox = document.querySelector('.movie__list')
    imgBox.innerHTML = moviesJson.Search.map(movie => `
        <div class="movie">
          <div class="movie__wrapper">
            <figure>
              <img
                src="${movie.Poster}"
              />
            </figure>
            <div class="movie__overlay">
              <h1 class="movie__overlay--title">${movie.Title}</h1>
              <h2 class="movie__overlay--year">${movie.Year}</h2>
            </div>
          </div>
        </div>
        `)
}

function acceptSearch(event) {
    let search = event.target.value
    console.log(search)
    getMovies(search)
}
