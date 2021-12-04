import axios from "axios";
import { createContext } from "react";

const api_key = process.env.API_KEY;
export const ShowContext = createContext({
  show: "Movies",
  setCurrentShow: () => {},
});

function apiCall(path) {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://api.themoviedb.org/3/${path}`)
      .then((data) => resolve(data.data))
      .catch((err) => reject(err));
  });
}

export function fetchDetails(type = "movie", id) {
  return new Promise((resolve, reject) => {
    apiCall(`${type}/${id}?api_key=${api_key}`)
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
}

export function fetchListByCompany(type = "movie", id, page = 1) {
  return new Promise((resolve, reject) => {
    apiCall(
      `discover/${type}?api_key=0de978b80925eb0e40210d8773fb3375&sort_by=popularity.desc&include_adult=true&include_video=true&page=${page}&with_companies=${id}&with_watch_monetization_types=flatrate`
    )
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
}

//movieList = popular, now_playing, latest, top_rated, upcoming
export function fetchList(type = "movie", movieList = "popular", page = 1) {
  return new Promise((resolve, reject) => {
    apiCall(`${type}/${movieList}?api_key=${api_key}&page=${page}`)
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
}

export function fetchSimilarList(type = "movie", id, page = 1) {
  return new Promise((resolve, reject) => {
    apiCall(`${type}/${id}/similar?api_key=${api_key}&page=${page}`)
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
}

export function searchQuery(type = "movie", string, page = 1) {
  let searchURL = `search/${type}?api_key=${api_key}&query=${string}&page=${page}&include_adult=true`;
  return new Promise((resolve, reject) => {
    apiCall(searchURL)
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
}
