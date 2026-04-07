import Link from 'next/link';
import { Star } from 'lucide-react';
import { Movie } from '../lib/types';
 
interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';

  return (
    <Link href={`/movie/${movie?.id}`}>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1 duration-300 cursor-pointer">
        <img src={imageUrl} alt={movie.title} className="w-full h-96 object-cover" />
        <div className="p-4">
          <h3 className="text-xl font-bold mb-2 truncate">{movie.title}</h3>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">{year}</span>
            <div className="flex items-center gap-1">
              <Star size={18} className="text-yellow-500 fill-current" />
              <span className="font-semibold">{movie.vote_average.toFixed(1)}</span>
            </div>
          </div>
          <p className="text-gray-700 text-sm line-clamp-3">{movie.overview || 'No description available.'}</p>
        </div>
      </div>
    </Link>
  );
}