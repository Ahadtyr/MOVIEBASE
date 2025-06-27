import PageContainer from '@/components/shared/PageContainer';
import SectionTitle from '@/components/shared/SectionTitle';
import MovieSection from '@/components/movie/MovieSection';
import { getMovieGenres, getDiscoverMovies } from '@/lib/tmdb';
import { notFound } from 'next/navigation';

interface GenrePageProps {
  params: { slug: string };
}

export default async function GenrePage({ params }: GenrePageProps) {
  const allGenres = await getMovieGenres();
  const genre = allGenres.find(g => g.name.toLowerCase().replace(/\s+/g, '-') === params.slug);

  if (!genre) {
    notFound();
  }
  
  const moviesInGenre = await getDiscoverMovies(genre.id.toString());

  return (
    <PageContainer>
      <SectionTitle>{genre.name} Movies</SectionTitle>
      {moviesInGenre.length > 0 ? (
        <MovieSection title="" items={moviesInGenre} />
      ) : (
        <p className="text-muted-foreground">No movies found in the {genre.name} genre yet. Check back soon!</p>
      )}
    </PageContainer>
  );
}
