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
        {title && <SectionTitle className="mb-0">{title}</SectionTitle>}
        {href && (
          <Link href={href} className="group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-accent transition-colors">
            <span>View all</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        )}
      </div>

      <div className="relative">
        <div className="flex space-x-4 md:space-x-6 overflow-x-auto pb-4 -mb-4">
          {items.map((item) => (
            <div key={item.id} className="flex-shrink-0 w-[45vw] sm:w-[30vw] md:w-[22vw] lg:w-[18vw] xl:w-[15vw]">
              <MovieCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
