import axios from 'axios';

// TMDB API 기본 설정
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const LANGUAGE = 'ko-KR'; // 한글로 받아오기

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: LANGUAGE,
  },
});

// 영화 검색
export const searchMovies = async (query, maxPages = 5) => {
  const allResults = [];
  try {
    for (let page = 1; page <= maxPages; page++) {
      const response = await tmdb.get('/search/movie', {
        params: { query, page },
      });
      allResults.push(...response.data.results);

      const totalPages = response.data.total_pages;
      if (page >= totalPages) break;
    }
    return allResults;
  } catch (error) {
    console.error('TMDB searchMovies error:', error);
    return [];
  }
};

// 인기 영화
export const getPopularMovies = async () => {
  try {
    const response = await tmdb.get('/movie/popular');
    return response.data.results;
  } catch (error) {
    console.error('TMDB getPopularMovies error:', error);
    return [];
  }
};

// 영화 상세 정보
export const getMovieDetails = async (movieId) => {
  try {
    const response = await tmdb.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error('TMDB getMovieDetails error:', error);
    return null;
  }
};

export const getSimilarMovies = async (movieId) => {
  try {
    const response = await tmdb.get(`/movie/${movieId}/similar`);
    return response.data.results;
  } catch (error) {
    console.error('TMDB getSimilarMovies error:', error);
    return [];
  }
};
