const api_key = '0de978b80925eb0e40210d8773fb3375';

function apiCall(path) {
    return new Promise((resolve, reject) => {
        fetch(`https://api.themoviedb.org/3/${path}`)
            .then(data => resolve(data))
            .catch(err => reject(err))
    });
}

export function fetchPopular(page = 1, language, type = 'movie') {
    return new Promise((resolve, reject) => {
        apiCall(`${type}/popular?api_key=${api_key}&language=${language}&page=${page}`)
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