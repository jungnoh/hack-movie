import Axios from 'axios';

export const store = {
  movies: {},
  theaters: {}
}

function ensureMovie(code) {
  return new Promise((res, rej) => {
    Axios.get(`/api/movie/code/${code}`).then((resp) => {
      localStorage.setItem(`movie-${code}`, JSON.stringify(resp.data.movie[0]));
      res();
    }).catch(rej);
  });
}
function ensureTheater(code) {
  return new Promise((res, rej) => {
    Axios.get(`/api/theater/code/${code}`, (resp) => {
      localStorage.setItem(`theater-${code}`, JSON.stringify(resp.data.theater[0]));
      res();
    }).catch(rej);
  });
}

export const getMovie = (code) => localStoarge.getItem(`movie-${code}`);
export const getTheater = (code) => localStoarge.getItem(`theater-${code}`);

export function loadNearestMovies(x, y, movie, callback) {
  const getMovie = Axios.get(`/api/movies-near?x=${x}&y=${y}&movie=${movie}`);
  return getMovie.then(v => callback(v.data.slots));
}