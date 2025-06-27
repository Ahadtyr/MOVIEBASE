import PageContainer from '@/components/shared/PageContainer';
import SectionTitle from '@/components/shared/SectionTitle';
import MovieSection from '@/components/movie/MovieSection';
import { getPopularMovies } from '@/lib/tmdb';
import type { Movie } from '@/lib/types';

async function getMoviesPageData() {
  try {
    // Fetch a list of popular movies from the API
    const popularMovies = await getPopularMovies();
    return { movies: popularMovies };
  } catch (error) {
    console.error("Failed to fetch movies page data:", error);
    // Return an empty array on error so the page doesn't crash
    return { movies: [] };
  }
}

export default async function MoviesPage() {
  const { movies } = await getMoviesPage-data();

  return (
    <PageContainer>
      <SectionTitle>Popular Movies</SectionTitle>
      <p className="mb-8 text-muted-foreground">Browse our collection of the most popular movies right now.</p>
      {movies.length > 0 ? (
        <MovieSection title="" items={movies} />
      ) : (
        <p className="text-muted-foreground text-center py-10">
          Could not load movies at the moment. Please ensure your TMDb API key is correct or try again later.
        </p>
      )}
    </PageContainer>
  );
}
