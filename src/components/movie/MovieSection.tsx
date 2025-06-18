import type { Movie, TVShow } from '@/lib/types';
import MovieCard from './MovieCard';
import SectionTitle from '@/components/shared/SectionTitle';

interface MovieSectionProps {
  title: string;
  items: (Movie | TVShow)[];
}

export default function MovieSection({ title, items }: MovieSectionProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className="py-8 md:py-12">
      <SectionTitle>{title}</SectionTitle>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {items.map((item) => (
          <MovieCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
