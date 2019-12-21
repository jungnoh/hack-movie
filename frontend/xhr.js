import Axios from 'axios';

export async function ensureMovie(code) {
  if (localStorage.getItem(`movie-${code}`) === null) {
    const resp = await Axios.get(`/api/movie/code/${code}`);
    localStorage.setItem(`movie-${code}`, resp.data.movie[0]);
  }
}
export function ensureTheater(code) {
  if (localStorage.getItem(`theater-${code}`) === null) {
    const resp = await Axios.get(`/api/movie/code/${code}`);
    localStorage.setItem(`theater-${code}`, resp.data.theater[0]);
  }
}

export const getMovie = (code) => localStoarge.getItem(`movie-${code}`);
export const getTheater = (code) => localStoarge.getItem(`theater-${code}`);

export async function loadNearestMovies(x, y, movie) {
  const resp = await Axios.get(`/api/movies-near?x=${x}&y=${y}&movie=${movie}`);
  const ret = resp.data.slots;
  for (const item of ret) {
    await ensureMovie(item.movieCode);
    await ensureTheater(item.theaterCode);
  }
  return ret;
}