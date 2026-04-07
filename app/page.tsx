'use client';

import { useState, useEffect } from 'react';
 import MovieCard from './components/MovieCard';
import { Movie } from './lib/types';
import SearchBar from './components/SearchBar';
import { getPopularMovies, searchMovies } from './lib/tmdb';


export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    // Load popular movies on initial load
    const loadPopular = async () => {
      setLoading(true);
      const popular = await getPopularMovies();
      setMovies(popular);
      setLoading(false);
    };
    loadPopular();
  }, []);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setSearched(true);
    const results = await searchMovies(query);
    setMovies(results);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8 shadow-lg mb-8">
        <h1 className="text-4xl font-bold text-center">🎬 Movie Search App</h1>
        <p className="text-center mt-2 opacity-90">Discover any movie you love</p>
      </header>

      <div className="container mx-auto px-4">
        <SearchBar onSearch={handleSearch} />

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading movies...</p>
          </div>
        )}

        {!loading && movies.length === 0 && searched && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No movies found. Try another search!</p>
          </div>
        )}

        {!loading && movies.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-6">
              {searched ? 'Search Results' : 'Popular Movies 🔥'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}