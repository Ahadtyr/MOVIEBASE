import type { Movie, TVShow } from '@/lib/types';
import MovieCard from './MovieCard';

interface MovieGridProps {
  items: (Movie | TVShow)[];
}

export default function MovieGrid({ items }: MovieGridProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 py-6">
      {items.map((item) => (
        <MovieCard key={`${item.id}-${'name' in item ? 'tv' : 'movie'}`} item={item} />
      ))}
    </div>
  );
}
