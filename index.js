let moviesJson;
let imgBox;

function openMenu() {
    document.body.classList += "menu--open"
}

function closeMenu() {
    document.body.classList.remove("menu--open")
}

async function getMoviesTitle(search) {
    imgBox = document.querySelector('.movie__wrapper--title')
    loadingState()
    let movies = await fetch(`https://www.omdbapi.com/?s=${search}&apikey=a91ed9b`)
    let moviesJsonWide = await movies.json();
    moviesJson = moviesJsonWide.Search
    endLoadingState()
    pushHTML(moviesJson, imgBox)
}

function acceptSearchTitle(event) {
    let search = event.target.value
    getMoviesTitle(search)
}

function loadingState() {
    document.body.classList +=  ` movies__loading`
}

function endLoadingState() {
    document.body.classList.remove(`movies__loading`)
}

function pushHTML(moviesJson, imgBox) {   
    imgBox.innerHTML = moviesJson.map(movie => `
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

function filterMovies(event) {
    let filter = event.target.value;
    let filterMovies;
    console.log(filterMovies)
    if (filter === "NEW_TO_OLD"){
        filterMovies = moviesJson.sort((a, b) => b.Year - a.Year)
    }else {
        filterMovies = moviesJson.sort((a, b) => a.Year - b.Year)
    }
    pushHTML(filterMovies, imgBox)
}