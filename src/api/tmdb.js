import axios from "axios";

const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
export const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const getTrending = () => api.get("/trending/movie/week");
export const getTopRated = (page = 1) =>
  api.get("/movie/top_rated", { params: { page } });
export const getMovieDetails = (id) => api.get(`/movie/${id}`);
export const getMovieTrailer = (id) => api.get(`/movie/${id}/videos`);
export const searchMovies = (query) =>
  api.get("/search/movie", { params: { query } });

export const getMoviesByGenre = (genreId, page = 1) =>
  api.get("/discover/movie", {
    params: {
      with_genres: genreId,
      page,
      sort_by: "vote_average.desc",
      "vote_count.gte": 1000,
    },
  });
