async function apiCall(path: string): Promise<any> {
  const result = await fetch(`https://api.themoviedb.org/3/${path}`);
  return await result.json();
}

export async function fetchDetails(type = "movie", id: string) {
  return await apiCall(
    `${type}/${id}?api_key=0de978b80925eb0e40210d8773fb3375`
  );
}

export async function fetchListByCompany(type = "movie", id: string, page = 1) {
  return await apiCall(
    `discover/${type}?api_key=0de978b80925eb0e40210d8773fb3375&sort_by=popularity.desc&include_adult=true&include_video=true&with_companies=${id}&page=${page}&with_watch_monetization_types=flatrate`
  );
}

//movieList = popular, now_playing, latest, top_rated, upcoming
export async function fetchList(
  type = "movie",
  movieList = "popular",
  page = 1
) {
  return await apiCall(
    `${type}/${movieList}?api_key=0de978b80925eb0e40210d8773fb3375&page=${page}`
  );
}

export async function fetchSimilarList(type = "movie", id: string, page = 1) {
  return await apiCall(
    `${type}/${id}/similar?api_key=0de978b80925eb0e40210d8773fb3375&page=${page}`
  );
}

export async function searchQuery(type = "movie", string: string, page = 1) {
  return await apiCall(
    `search/${type}?api_key=0de978b80925eb0e40210d8773fb3375&query=${string}&page=${page}&include_adult=true`
  );
}
