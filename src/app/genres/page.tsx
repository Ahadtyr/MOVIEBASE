import PageContainer from '@/components/shared/PageContainer';
import SectionTitle from '@/components/shared/SectionTitle';
import Link from 'next/link';
import { Tag } from 'lucide-react';
import { getMovieGenres } from '@/lib/tmdb';
import type { Genre } from '@/lib/types';

export default async function GenresPage() {
  const genres = await getMovieGenres();

  return (
    <PageContainer>
      <SectionTitle>Explore by Genre</SectionTitle>
      <p className="mb-8 text-muted-foreground">Find movies based on your favorite genres.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {genres.map((genre: Genre) => (
          <Link
            href={`/genre/${genre.name.toLowerCase().replace(/\s+/g, '-')}`}
            key={genre.id}
            className="group block p-6 rounded-lg bg-card hover:bg-primary/20 transition-all duration-300 ease-in-out shadow-lg hover:shadow-accent/30 transform hover:scale-105"
            aria-label={`Explore ${genre.name} genre`}
          >
            <div className="flex flex-col items-center text-center">
              <Tag className="w-10 h-10 mb-3 text-primary group-hover:text-accent transition-colors neon-glow" />
              <h3 className="text-lg font-semibold text-primary-foreground group-hover:text-accent transition-colors">{genre.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </PageContainer>
  );
}
