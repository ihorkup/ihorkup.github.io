const log = console.log;

const MOVIE_DB_API = 'd8bf019d0cca372bd804735f172f67e8';
const MOVIE_DB_ENDPOINT = 'https://api.themoviedb.org';
const MOVIE_DB_IMAGE_ENDPOINT = 'https://image.tmdb.org/t/p/w500';

const searchButton = document.querySelector('#search');;
const searchInput = document.querySelector('#exampleInputEmail1');
const moviesContainer = document.querySelector('#movies-container');
const moviesSearchable = document.querySelector('#movies-searchable');

function requestMovies(url, onComplete, onError) {
    fetch(url)
        .then((res) => res.json())
        .then(onComplete)
        .catch(onError);
}

function generateMovieDBUrl(path) {
    const url = `${MOVIE_DB_ENDPOINT}/3${path}?api_key=${MOVIE_DB_API}`;
    return url;
}

function getTrendingMovies() {
    const url = generateMovieDBUrl('/trending/movie/day');
    const render = renderMovies.bind({ title: 'TRENDING MOVIES & TV:' })
    requestMovies(url, render, handleGeneralError);
}

function searchMovie(value) {
    const url = generateMovieDBUrl('/search/movie') + '&query=' + value;
    requestMovies(url, renderSearchMovies, handleGeneralError);
}

function getInfoAboutMovies(movieId, content){
    const url = generateMovieDBUrl(`/movie/${movieId}`);
    const render = createInfo.bind({ content });
    requestMovies(url, render, handleGeneralError);
}

function getRecommendforInfoBox(movieId, content) {
    const url = generateMovieDBUrl(`/movie/${movieId}/recommendations`);
    const render = renderDataRecInBox.bind({ content });
    requestMovies(url, render, handleGeneralError);
}

function renderDataRecInBox(data) {
    const content = this.content;
    const movies = data.results;
    const section = document.createElement('ul');
    const arr = [];
        for (let p=0; p<5; p++){
        const { title, id } = movies[p];

        const imageContainer = createRecommendContainer(title, id);
        section.appendChild(imageContainer);
    }
content.appendChild(section);
    
}

function createRecommendContainer(title, id) {
    const tempDiv = document.createElement('li');
    tempDiv.setAttribute('data-id', id);
    tempDiv.setAttribute('data-movie-id', id);

    const movieElement = `
        ${title}
    `;
    tempDiv.innerHTML = movieElement;

    return tempDiv;
}

function infoAboutMovie(movies) {
    const infoId = document.createElement('div');
    infoId.setAttribute('class', 'imageContainer');

    const infoElement = `
        <p>${movies.title}</p>       
    `;
    infoId.innerHTML = infoElement;

    return infoId;   
}

function createImageContainer(imageUrl, id) {
    const tempDiv = document.createElement('div');
    tempDiv.setAttribute('class', 'imageContainer');
    tempDiv.setAttribute('data-id', id);

    const movieElement = `
        <img class="imageSearch" src="${imageUrl}" alt="" data-movie-id="${id}">
    `;
    tempDiv.innerHTML = movieElement;

    return tempDiv;
}


function resetInput() {
    searchInput.value = '';
}

function handleGeneralError(error) {
    log('Error: ', error.message);
}

function createSectionHeader(title) {
    const header = document.createElement('h2');
    header.innerHTML = title;

    return header;
}

function renderMoviesRec(data) {
    const moviesBlock = generateMoviesBlockRec(data);
    const header = createSectionHeader(this.title);
    moviesBlock.insertBefore(header, moviesBlock.firstChild);
    moviesContainer.appendChild(moviesBlock);
}

function renderMovies(data) {
    const moviesBlock = generateMoviesBlock(data);
    const header = createSectionHeader(this.title);
    moviesBlock.insertBefore(header, moviesBlock.firstChild);
    moviesContainer.appendChild(moviesBlock);
}

function renderSearchMovies(data) {
    moviesSearchable.innerHTML = '';
    const moviesBlock = generateMoviesBlock(data);
    moviesSearchable.appendChild(moviesBlock);
    console.log('Data: ', data);
}

function generateMoviesBlock(data) {
    const movies = data.results;
    const section = document.createElement('section');
    section.setAttribute('class', 'section');

    for (let i = 0; i < movies.length; i++) {
        const { poster_path, id } = movies[i];

        if (poster_path) {
            const imageUrl = MOVIE_DB_IMAGE_ENDPOINT + poster_path;
    
            const imageContainer = createImageContainer(imageUrl, id);
            section.appendChild(imageContainer);
        }
    }

function createMovieContainer(section) {
    const movieElement = document.createElement('div');
    movieElement.setAttribute('class', 'movie');

    const template = `
        <div class="content">
            <p id="content-close">X</p>
        </div>
    `;

    movieElement.innerHTML = template;
    movieElement.insertBefore(section, movieElement.firstChild);
    return movieElement;
    }

    const movieSectionAndContent = createMovieContainer(section);
    return movieSectionAndContent;
}


function createInfo(data) {
    const content = this.content;
    const movieId = data.id;
    const imageUrl = MOVIE_DB_IMAGE_ENDPOINT + data.poster_path;

    content.innerHTML = `
        <table>
        <p id="content-close">X</p>
        <tr>
        <td id="textInfo">
        <h1 id="mainTitle">${data.title}</h1>
        <h4 class="titleInfo">${data.title} Details</h4>
        <p>RELEASE DATE: ${data.release_date}</p>
        <p>COUNTRY: ${data.production_countries[0].name}</p>
        <p>GENRES: ${data.genres[0].name}</p>
        <p>DURATION: ${data.runtime} min</p>
        <h4 class="titleInfo">${data.title} Summary</h4>
        <p>${data.overview}</p>
        </td>
            <td>
                <img src="${imageUrl}" 
                class="imageInfo" 
                alt="${data.title}" 
                data-movie-id="${movieId}">
            </td>
        </tr>
        <tr>
            <td>
                <h2>
                    Recommendations
                </h2>
            </td>
        </tr>
        </table>
        `;
    return;
} 
    

searchButton.onclick = function (event) {
    event.preventDefault();
    const value = searchInput.value

   if (value) {
    searchMovie(value);
   }
    resetInput();
}

document.onclick = function (event) {
    log('Event: ', event);
    const {className, id, tagName} = event.target;
    if (className === 'imageSearch' || tagName === 'li') {
        const movieId = event.target.dataset.movieId;
        const section = event.target.parentElement.parentElement;
        const content = section.nextElementSibling;
        content.classList.add('content-display');
        getInfoAboutMovies(movieId, content);   
        getRecommendforInfoBox(movieId, content);
    }
    if (id === 'content-close') {
        const content = event.target.parentElement;
        content.classList.remove('content-display');
    }
}

getTrendingMovies();
