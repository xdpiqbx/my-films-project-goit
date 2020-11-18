import {
    fetchMovie,
    createUrlForTrending,
    createUrlSearchByKeyword,
    createUrlForFullInfo
} from './javascript/fetchMovie'

import {renderFullInfo} from './javascript/api'

import './styles.scss';

const refs = {
    mainWrapper: document.querySelector('.js-films-wrapper-list'),
    pagination: document.querySelector('.js-pages'),
    modal: document.querySelector('.modal'),
    addedToWatched: document.querySelector('.added-to-watched'),
    addedToQueue: document.querySelector('.added-to-queue')
}

fetchMovie(createUrlForTrending())
    .then(data => {
        const films = data.results

        films.map(movieData => refs.mainWrapper.insertAdjacentHTML("beforeend", renderMoviesListItem(movieData)))

        refs.mainWrapper.addEventListener('click', event => {
            refs.modal.classList.remove('hide')
            const id = event.path[1].dataset.id
            if(id){
                renderFullInfo(+id)
            }
        })
    }
)

refs.addedToWatched.addEventListener('click', event => {
    refs.modal.classList.add('hide')
    const movieIds = localStorage.getItem('toWatched')
    renderWatchedOrQueue(movieIds)
})

refs.addedToQueue.addEventListener('click', event => {
    refs.modal.classList.add('hide')
    const movieIds = localStorage.getItem('toQueue')
    renderWatchedOrQueue(movieIds)
})

function renderWatchedOrQueue(movieIds){
    refs.mainWrapper.innerHTML = ''
    movieIds.split(' ').map( id => {
        fetchMovie(createUrlForFullInfo(id))
        .then(movieData => {
            refs.mainWrapper.insertAdjacentHTML("beforeend", renderMoviesListItem(movieData))
        })
    })
}

function renderMoviesListItem(data){
    return `
        <li class="js-films-wrapper-list__item" data-id="${data.id}">
            <img width="200px" src="https://image.tmdb.org/t/p/w500/${data.poster_path}"/>
            <p>${data.title || data.name}</p>
        </li>
    `
}