import {
    fetchMovie,
    createUrlForFullInfo
} from './fetchMovie'

const refs = {
    modal: document.querySelector('.modal')
}

// export const renderFullInfo = (id) => {
//    let data = localStorage.getItem('data')
//    console.log(JSON.parse(data).find(data => data.id === id));
// }

export const renderFullInfo = (id) => {
    /*
        после клика на фильм сюда приходит его id
        вызвав эту ф-цию как параметр в
        тут отрисовую фильм
        и две кнопки
        Add to watched (и чтоб потом кнопка була неактивна)
        Add to queue (и чтоб потом кнопка була неактивна)
    */
   fetchMovie(createUrlForFullInfo(id))
        .then(data=>{
            //console.log('genres', data)
            const html = `
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
            refs.modal.innerHTML = html

            const close = document.querySelector('.js-close')
            close.addEventListener('click', ()=>{
                refs.modal.classList.add('hide')
            })
            return id
        })
        .then((id)=>{
//            console.log(id);
//            localStorage
            
            const wrapBtns = document.querySelector('.js-btns-add')
            const toWatched = wrapBtns.querySelector('.to-watched')
            const toQueue = wrapBtns.querySelector('.to-queue')

            toWatched.addEventListener('click', ()=>{
                console.log('toWatched', id);
                let watchedFromStorage = localStorage.getItem('watched')

                if(!watchedFromStorage){
                    watchedFromStorage = id
                }else{
                    watchedFromStorage += ` ${id}`
                }
                
                localStorage.setItem('watched', watchedFromStorage)
                /*
                    получить из localStorage все id из toWatched
                    проверить естиь ли этот и если нету дописать в конец
                */
            })

            toQueue.addEventListener('click', ()=>{
                console.log('toQueue', id);
            })

            console.log(wrapBtns);
            localStorage.setItem('addToWatched', watched)
        })
        .catch(e=>{
            console.log(e);
        })
}

function renderGenres(data){
    const genres = data.genres.map(genre => genre.name)
    return `<span>${genres.join(', ')}</span>`
}