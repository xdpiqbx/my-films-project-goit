// Ссылка на документацию для запроса на список самых популярных фильмов на сегодня для создания коллекции на главной странице:
//	https://developers.themoviedb.org/3/trending/get-trending
//  https://api.themoviedb.org/3/trending/all/day?api_key=<<api_key>>

// Ссылка на документацию для запроса кинофильма по ключевому слову на главное странице:
// https://developers.themoviedb.org/3/search/search-movies
// https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false

// Ссылка на документацию для запроса у полной информации о кинофильме для страницы кинофильма:
// https://developers.themoviedb.org/3/movies/get-movie-details
// https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US


/*
    FT-07 Реализовать подгрузку популярных фильмов на главную (первую) страницу ++++
    FT-09 При переходе на каждую страницу отрисосывать соответствующую часть фильмов ----------
    FT-18 По нажатию на кнопку "Add to watched" фильм добавляется в просмотренные фильмы текущего пользователя (local-storage)
    FT-19 По нажатию на кнопку "Add to queue" фильм добавляется в очередь текущего пользователя (local-storage)
    FT-14 По нажатию на кнопку "Watched" (вверху на главной) показываются просмотренные фильмы пользователя
    FT-15 По нажатию на кнопку "Queue" (вверху на главной) показываются фильмы добавленные в очередь пользователя
*/

const KEY = "9fba788361f0940b39e64c54ec217196"
const DEFAULT_PAGE = 1
const BASE_URL = "https://api.themoviedb.org/3/"
const LANGUAGE = 'en-US'

export const createUrlForTrending = (page = DEFAULT_PAGE) => {
    return `${BASE_URL}trending/all/day?api_key=${KEY}&page=${page}&adult=false`
}

export const createUrlSearchByKeyword = (query, page = DEFAULT_PAGE) => {
    return `${BASE_URL}search/movie?api_key=${KEY}&language=${LANGUAGE}&page=${page}&include_adult=false&query=${query}`
}

export const createUrlForFullInfo = (movie_id) => {
    return `${BASE_URL}movie/${movie_id}?api_key=${KEY}&language=${LANGUAGE}`
}

export function fetchMovie(url){
    return fetch(url).then(response => response.json())
}