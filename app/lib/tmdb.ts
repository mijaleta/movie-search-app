const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;

export async function searchMovies(query: string, page: number = 1) {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=en-US&page=${page}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }
  
  const data = await response.json();
  return {
    results: data.results,
    totalPages: data.total_pages,
    totalResults: data.total_results,
    currentPage: page
  };
}

export async function getPopularMovies(page: number = 1) {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch popular movies');
  }
  
  const data = await response.json();
  return {
    results: data.results,
    totalPages: data.total_pages,
    totalResults: data.total_results,
    currentPage: page
  };
}