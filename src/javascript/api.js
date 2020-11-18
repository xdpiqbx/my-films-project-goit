import {
    fetchMovie,
    createUrlForFullInfo
} from './fetchMovie'

/*
    Тут по id получаю полную информацию о фильме для модалки
    И формирую модалку со всеми кнопками и т.п.
*/

const refs = {
    modal: document.querySelector('.modal')
}

export const renderFullInfo = (id) => {
   fetchMovie(createUrlForFullInfo(id))
        .then(data=>{
            refs.modal.innerHTML = renderModalContent(data)
            const close = document.querySelector('.js-close')
            close.addEventListener('click', ()=>{
                refs.modal.classList.add('hide')
            })
            data = null
            return id
        })
        .then((id)=>{
            const wrapBtns = document.querySelector('.js-btns-add')
            const toWatched = wrapBtns.querySelector('.to-watched')
            const toQueue = wrapBtns.querySelector('.to-queue')

            toWatched.addEventListener('click', () => addUnicIdToLocalStorage('toWatched', id))
            toQueue.addEventListener('click', () => addUnicIdToLocalStorage('toQueue', id))
        })
        .catch(e=>{
            console.log(e);
        })
}

function renderGenres(data){
    return `<span>${data.genres.map(genre => genre.name).join(', ')}</span>`
}

function addUnicIdToLocalStorage(nameInStorage, id){
    let IdFromStorage = localStorage.getItem(nameInStorage)
    IdFromStorage = isIdExistInLocalStorage(IdFromStorage, id)
    localStorage.setItem(nameInStorage, IdFromStorage)
}

function isIdExistInLocalStorage(fromStorage, currentId){
    if(!fromStorage){
        fromStorage = currentId
    }else if(fromStorage.indexOf(currentId) < 0){
        fromStorage += ` ${currentId}`
    }
    return fromStorage
}

function renderModalContent(data){
    return `
        <div>
            <img width='300' src="https://image.tmdb.org/t/p/w500/${data.poster_path}"/>
        </div>
        <div>
            <h3>${data.name || data.title}</h3>
            <p>vote / votes ----- ${data.vote_average} / ${data.vote_count}</p>
            <p>Popularity ${data.popularity}</p>
            <p>Original title: ${data.original_title || data.original_name }</p>
            <p>Genre: ${renderGenres(data)}</p>
            <h4>About</h4>
            <p>${data.overview}</p>
            <div class="js-btns-add">
                <button class="to-watched">Add to watched</button>                    
                <button class="to-queue">Add to queue</button>
                <button class='js-close'>Close</button>
            </div>
        </div>
    `
}