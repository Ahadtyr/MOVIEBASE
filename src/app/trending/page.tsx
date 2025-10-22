import PageContainer from '@/components/shared/PageContainer';
import SectionTitle from '@/components/shared/SectionTitle';
import MovieGrid from '@/components/movie/MovieGrid';
import { getPopularMovies } from '@/lib/tmdb';

export default async function TrendingPage() {
  const trendingMovies = await getPopularMovies();
  const top20Movies = trendingMovies.slice(0, 20);

  return (
    <PageContainer>
      <SectionTitle>Top 20 Trending Movies</SectionTitle>
      <p className="mb-8 text-muted-foreground">The most popular movies right now, based on today's trends.</p>
      {top20Movies.length > 0 ? (
        <MovieGrid items={top20Movies} />
      ) : (
        <p className="text-muted-foreground">Could not load trending movies. Please try again later.</p>
      )}
    </PageContainer>
  );
}
