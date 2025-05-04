let movies;

function openMenu() {
    document.body.classList += "menu--open"
}

function closeMenu() {
    document.body.classList.remove("menu--open")
}

async function getMoviesTitle(search) {
    let imgBox = document.querySelector('.movie__wrapper--title')
    loadingState()
    movies = await fetch(`https://www.omdbapi.com/?s=${search}&apikey=a91ed9b`)
    let moviesJson = await movies.json();
    console.log(moviesJson)
    endLoadingState()
    pushHTML(moviesJson, imgBox)
}

function acceptSearchTitle(event) {
    let search = event.target.value
    console.log(search)
    getMoviesTitle(search)
}

function loadingState() {
    document.body.classList +=  ` movies__loading`
}

function endLoadingState() {
    document.body.classList.remove(`movies__loading`)
}

function pushHTML(moviesJson, imgBox) {   
    imgBox.innerHTML = moviesJson.Search.map(movie => `
        <div class="movie">
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
        `)
}