import PageContainer from '@/components/shared/PageContainer';
import SectionTitle from '@/components/shared/SectionTitle';
import { placeholderGenres, placeholderMovies } from '@/lib/placeholder-data';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Tag } from 'lucide-react';

export default function GenresPage() {
  return (
    <PageContainer>
      <SectionTitle>Explore by Genre</SectionTitle>
      <p className="mb-8 text-muted-foreground">Find movies and TV shows based on your favorite genres.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {placeholderGenres.map((genre) => (
          <Link 
            href={`/genre/${genre.toLowerCase().replace(/\s+/g, '-')}`} 
            key={genre}
            className="group block p-6 rounded-lg bg-card hover:bg-primary/20 transition-all duration-300 ease-in-out shadow-lg hover:shadow-accent/30 transform hover:scale-105"
            aria-label={`Explore ${genre} genre`}
          >
            <div className="flex flex-col items-center text-center">
              <Tag className="w-10 h-10 mb-3 text-primary group-hover:text-accent transition-colors neon-glow" />
              <h3 className="text-lg font-semibold text-primary-foreground group-hover:text-accent transition-colors">{genre}</h3>
              {/* Could add a count of movies in this genre if available */}
              <p className="text-xs text-muted-foreground mt-1">
                {placeholderMovies.filter(m => m.genres.some(g => g.name === genre)).length} titles
              </p>
            </div>
          </Link>
        ))}
      </div>
    </PageContainer>
  );
}

// You would also create a dynamic route page src/app/genre/[slug]/page.tsx to display movies for a specific genre.
// This is out of scope for the current request but a natural next step.
