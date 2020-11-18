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
    modal: document.querySelector('.modal')
}

fetchMovie(createUrlForTrending())
    .then(data => {
        //console.log(data)
        console.log(data.results)
//        localStorage.setItem('data', JSON.stringify(data.results))

        //const films = data.results.slice(0, 9)
        const films = data.results

        films.map(d => {
            const html = `
                <li class="js-films-wrapper-list__item" data-id="${d.id}">
                    <img width="200px" src="https://image.tmdb.org/t/p/w500/${d.poster_path}"/>
                    <p>${d.title || d.name}</p>
                </li>
            `
            refs.mainWrapper.insertAdjacentHTML("beforeend", html)
        })

        let refsList = document.querySelectorAll('[data-id]')

        refs.mainWrapper.addEventListener('click', event => {
            console.log(event.path[1])
            refs.modal.classList.remove('hide')
            renderFullInfo(+event.path[1].dataset.id) // отдаю id в след запрос
        })
    }
)




// fetchMovie(createUrlSearchByKeyword('dog'))
//     .then(data=>{
//         console.log(data.results)
//     }
// )


// let html = ``
// refs.pagination.insertAdjacentHTML("beforeend", html)
