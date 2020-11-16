import fetchFilmsPromise from './javascript/fetchFilms'
import './styles.scss';

const refs = {
    mainWrapper: document.querySelector('.js-films-wrapper-list')
}

fetchFilmsPromise.fetchFilms()
    .then(response => response.json())
    .then(data => {
        // console.log(data.results.map(d => d.title || d.name))
        // console.log(data.results.map(d => d.backdrop_path))
        // console.log(data.results.map(d => d.poster_path))
        // console.log(data.results.map(d => d))

        data.results.map(d => {
            d.poster_path
            const html = `
                <li class="js-films-wrapper-list__item">
                    <img width="200px" src="https://image.tmdb.org/t/p/w500/${d.poster_path}"/>
                    <p>${d.title || d.name}</p>
                </li>                
            `
            refs.mainWrapper.insertAdjacentHTML("beforeend", html)
        })

    })