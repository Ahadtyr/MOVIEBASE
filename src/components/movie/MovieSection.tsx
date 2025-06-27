import type { Movie, TVShow } from '@/lib/types';
import MovieCard from './MovieCard';
import SectionTitle from '@/components/shared/SectionTitle';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface MovieSectionProps {
  title: string;
  items: (Movie | TVShow)[];
  href?: string;
}

export default function MovieSection({ title, items, href }: MovieSectionProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className="py-8 md:py-12">
      <div className="flex items-baseline justify-between mb-6">
        <SectionTitle className="mb-0">{title}</SectionTitle>
        {href && (
          <Link href={href} className="group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-accent transition-colors">
            <span>View all</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {items.map((item) => (
          <MovieCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
