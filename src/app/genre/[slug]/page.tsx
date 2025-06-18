import PageContainer from '@/components/shared/PageContainer';
import SectionTitle from '@/components/shared/SectionTitle';
import MovieSection from '@/components/movie/MovieSection';
import { placeholderMovies, placeholderGenres } from '@/lib/placeholder-data';
import { notFound } from 'next/navigation';
import type { Movie } from '@/lib/types';

export async function generateStaticParams() {
  return placeholderGenres.map((genre) => ({
    slug: genre.toLowerCase().replace(/\s+/g, '-'),
  }));
}

interface GenrePageProps {
  params: { slug: string };
}

export default async function GenrePage({ params }: GenrePageProps) {
  const genreName = params.slug.replace(/-/g, ' ');
  const capitalizedGenreName = genreName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  const moviesInGenre = placeholderMovies.filter(movie => 
    movie.genres.some(g => g.toLowerCase() === genreName)
  );

  if (moviesInGenre.length === 0 && !placeholderGenres.map(g => g.toLowerCase()).includes(genreName)) {
    notFound();
  }

  return (
    <PageContainer>
      <SectionTitle>{capitalizedGenreName} Movies</SectionTitle>
      {moviesInGenre.length > 0 ? (
        <MovieSection title="" items={moviesInGenre} />
      ) : (
        <p className="text-muted-foreground">No movies found in the {capitalizedGenreName} genre yet. Check back soon!</p>
      )}
    </PageContainer>
  );
}
