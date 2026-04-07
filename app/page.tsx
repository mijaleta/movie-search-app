'use client';

import { useState, useEffect } from 'react';
import { Movie } from './lib/types';
import { getPopularMovies, searchMovies } from './lib/tmdb';
import SearchBar from './components/SearchBar';
import MovieCard from './components/MovieCard';
import Pagination from './components/Pagination';
  

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentQuery, setCurrentQuery] = useState('');

  // Load popular movies on initial load or page change
  useEffect(() => {
    if (!searched) {
      const loadPopular = async () => {
        setLoading(true);
        setError('');
        try {
          const data = await getPopularMovies(currentPage);
          setMovies(data.results);
          setTotalPages(data.totalPages);
        } catch (err) {
          setError('Failed to load popular movies. Please try again.');
          setMovies([]);
        } finally {
          setLoading(false);
        }
      };
      loadPopular();
    }
  }, [currentPage, searched]);

  const handleSearch = async (query: string, page: number = 1) => {
    setLoading(true);
    setSearched(true);
    setError('');
    setCurrentQuery(query);
    setCurrentPage(page);
    
    try {
      const data = await searchMovies(query, page);
      setMovies(data.results);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError('Failed to search movies. Please try again.');
      setMovies([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    if (searched) {
      handleSearch(currentQuery, newPage);
    }
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewSearch = (query: string) => {
    setSearched(false);
    setCurrentPage(1);
    handleSearch(query, 1);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8 shadow-lg mb-8">
        <h1 className="text-4xl font-bold text-center">🎬 Movie Search App</h1>
        <p className="text-center mt-2 opacity-90">Discover any movie you love</p>
      </header>

      <div className="container mx-auto px-4">
        <SearchBar onSearch={handleNewSearch} />

        {error && (
          <div className="text-center py-4">
            <p className="text-red-600 bg-red-100 p-3 rounded-lg inline-block">{error}</p>
          </div>
        )}

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading movies...</p>
          </div>
        )}

        {!loading && movies.length === 0 && searched && !error && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No movies found. Try another search!</p>
          </div>
        )}

        {!loading && movies.length > 0 && (
          <div className="mt-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {searched ? `Search Results for "${currentQuery}"` : 'Popular Movies 🔥'}
              </h2>
              <p className="text-gray-600">
                Page {currentPage} of {totalPages}
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}