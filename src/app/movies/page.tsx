import PageContainer from '@/components/shared/PageContainer';
import SectionTitle from '@/components/shared/SectionTitle';
import MovieSection from '@/components/movie/MovieSection';
import { getPopularMovies, getDiscoverMoviesByParams } from '@/lib/tmdb';
import type { Movie } from '@/lib/types';

// Comedy Genre ID is 35
const COMEDY_GENRE_ID = '35';

async function getMoviesPageData() {
  try {
    const [
      popularMoviesData,
      comedyMoviesData,
      hindiMoviesData,
      koreanMoviesData
    ] = await Promise.all([
      getPopularMovies(),
      getDiscoverMoviesByParams({ with_genres: COMEDY_GENRE_ID }),
      getDiscoverMoviesByParams({ with_original_language: 'hi' }),
      getDiscoverMoviesByParams({ with_origin_country: 'KR' })
    ]);
    
    return { 
      popularMovies: popularMoviesData.slice(0, 12),
      comedyMovies: comedyMoviesData.slice(0, 12),
      hindiMovies: hindiMoviesData.slice(0, 12),
      koreanMovies: koreanMoviesData.slice(0, 12),
    };
  } catch (error) {
    console.error("Failed to fetch movies page data:", error);
    // Gracefully return empty arrays if there's an error (e.g., missing API key)
    return { popularMovies: [], comedyMovies: [], hindiMovies: [], koreanMovies: [] };
  }
}

export default async function MoviesPage() {
  const { popularMovies, comedyMovies, hindiMovies, koreanMovies } = await getMoviesPageData();

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

      {hindiMovies.length > 0 && (
        <MovieSection title="Hindi Cinema" items={hindiMovies} />
      )}

      {koreanMovies.length > 0 && (
        <MovieSection title="Korean Cinema" items={koreanMovies} />
      )}

      {(popularMovies.length === 0 && comedyMovies.length === 0 && hindiMovies.length === 0 && koreanMovies.length === 0) && (
        <p className="text-muted-foreground text-center py-10">
          Could not load movies at the moment. Please ensure your TMDb API key is correct or try again later.
        </p>
      )}
    </PageContainer>
  );
}
