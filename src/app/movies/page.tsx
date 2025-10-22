
import PageContainer from '@/components/shared/PageContainer';
import SectionTitle from '@/components/shared/SectionTitle';
import MovieSection from '@/components/movie/MovieSection';
import { getPopularMovies, getDiscoverMoviesByParams } from '@/lib/tmdb';
import type { Movie } from '@/lib/types';

// Comedy Genre ID is 35
const COMEDY_GENRE_ID = '35';

async function getMoviesPageData() {
  const today = new Date().toISOString().split('T')[0];

  const [
    popularMoviesData,
    comedyMoviesData,
    bollywoodMoviesData,
    hollywoodMoviesData
  ] = await Promise.all([
    getPopularMovies(),
    getDiscoverMoviesByParams({ with_genres: COMEDY_GENRE_ID }),
    getDiscoverMoviesByParams({ with_original_language: 'hi', sort_by: 'primary_release_date.desc', 'primary_release_date.lte': today }),
    getDiscoverMoviesByParams({ with_origin_country: 'US', sort_by: 'primary_release_date.desc', 'primary_release_date.lte': today })
  ]);
  
  return { 
    popularMovies: popularMoviesData.slice(0, 12),
    comedyMovies: comedyMoviesData.slice(0, 12),
    bollywoodMovies: bollywoodMoviesData.slice(0, 12),
    hollywoodMovies: hollywoodMoviesData.slice(0, 12),
  };
}

export default async function MoviesPage() {
  const { popularMovies, comedyMovies, bollywoodMovies, hollywoodMovies } = await getMoviesPageData();

  return (
    <PageContainer>
      <SectionTitle>Browse Movies</SectionTitle>
      <p className="mb-8 text-muted-foreground">Explore our vast collection of movies from different categories.</p>
      
      {popularMovies.length > 0 && (
        <MovieSection title="Popular Movies" items={popularMovies} />
      )}
      
      {comedyMovies.length > 0 && (
        <MovieSection title="Comedy Movies" items={comedyMovies} />
      )}

      {bollywoodMovies.length > 0 && (
        <MovieSection title="Bollywood" items={bollywoodMovies} />
      )}

      {hollywoodMovies.length > 0 && (
        <MovieSection title="Hollywood" items={hollywoodMovies} />
      )}

      {(popularMovies.length === 0 && comedyMovies.length === 0 && bollywoodMovies.length === 0 && hollywoodMovies.length === 0) && (
        <p className="text-muted-foreground text-center py-10">
          Could not load movies at the moment. Please ensure your TMDb API key is correct or try again later.
        </p>
      )}
    </PageContainer>
  );
}
