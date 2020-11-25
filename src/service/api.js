const api_key = '0de978b80925eb0e40210d8773fb3375';

function apiCall(path) {
    return new Promise((resolve, reject) => {
        fetch(`https://api.themoviedb.org/3/${path}`)
            .then(data => resolve(data))
            .catch(err => reject(err))
    });
}

//movieList = popular, now_playing, latest, top_rated, upcoming
export function fetchList(type = 'movie', movieList = 'popular', language = 'en-US', page = 1) {
    return new Promise((resolve, reject) => {
        apiCall(`${type}/${movieList}?api_key=${api_key}&language=${language}&page=${page}`)
            .then(data => resolve(data))
            .catch(err => reject(err))
    });
}

export function fetchSimilarList(type = 'movie', page = 1, id, language = 'en-US') {
    return new Promise((resolve, reject) => {
        apiCall(`${type}/${id}/similar?api_key=${api_key}&language=${language}&page=${page}`)
            .then(data => resolve(data))
            .catch(err => reject(err))
    });
}

export function searchQuery(page = 1, language, string, year, type = 'movie') {
    let searchURL = `search/${type}?api_key=${api_key}&query=${string}&page=${page}&include_adult=true`;
    if(language) {
        searchURL = searchURL.concat(`&language=${language}`);
    }
    if(year) {
        searchURL = searchURL.concat(`&year=${year}`);
    }
    return new Promise((resolve, reject) => {
        apiCall(searchURL)
            .then(data => resolve(data))
            .catch(err => reject(err))
    });
}