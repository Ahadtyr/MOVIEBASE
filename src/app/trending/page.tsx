import PageContainer from '@/components/shared/PageContainer';
import SectionTitle from '@/components/shared/SectionTitle';
import MovieGrid from '@/components/movie/MovieGrid';
import { getPopularMovies } from '@/lib/tmdb';
import type { Movie } from '@/lib/types';

export default async function TrendingPage() {
  const trendingMovies = await getPopularMovies();
  const top15Movies = trendingMovies.slice(0, 15);

  return (
    <PageContainer>
      <SectionTitle>Top 15 Trending Movies</SectionTitle>
      <p className="mb-8 text-muted-foreground">The most popular movies right now.</p>
      {top15Movies.length > 0 ? (
        <MovieGrid items={top15Movies} />
      ) : (
        <p className="text-muted-foreground">Could not load trending movies. Please try again later.</p>
      )}
    </PageContainer>
  );
}
