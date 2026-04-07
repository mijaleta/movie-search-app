

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;

export async function searchMovies(query: string) {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=en-US`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }
  
  const data = await response.json();
  return data.results;
}

export async function getPopularMovies() {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch popular movies');
  }
  
  const data = await response.json();
  return data.results;
}