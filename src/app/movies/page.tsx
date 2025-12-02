
import PageContainer from '@/components/shared/PageContainer';
import SectionTitle from '@/components/shared/SectionTitle';
import MovieSection from '@/components/movie/MovieSection';
import { getPopularMovies, getDiscoverMoviesByParams } from '@/lib/tmdb';

// Provider IDs for movies
const NETFLIX_ID = '8';
const PRIME_VIDEO_ID = '9';
const APPLE_TV_ID = '350';
const DISNEY_PLUS_ID = '337';
const HBO_MAX_ID = '384';
const PEACOCK_ID = '386';

async function getMoviesPageData() {
  const commonParams = { watch_region: 'US' };

  const [
    popularMoviesData,
    netflixMoviesData,
    primeMoviesData,
    appleMoviesData,
    disneyMoviesData,
    hboMoviesData,
    peacockMoviesData,
  ] = await Promise.all([
    getPopularMovies(),
    getDiscoverMoviesByParams({ ...commonParams, with_watch_providers: NETFLIX_ID }),
    getDiscoverMoviesByParams({ ...commonParams, with_watch_providers: PRIME_VIDEO_ID }),
    getDiscoverMoviesByParams({ ...commonParams, with_watch_providers: APPLE_TV_ID }),
    getDiscoverMoviesByParams({ ...commonParams, with_watch_providers: DISNEY_PLUS_ID }),
    getDiscoverMoviesByParams({ ...commonParams, with_watch_providers: HBO_MAX_ID }),
    getDiscoverMoviesByParams({ ...commonParams, with_watch_providers: PEACOCK_ID }),
  ]);
  
  return { 
    popularMovies: popularMoviesData.slice(0, 12),
    netflixMovies: netflixMoviesData.movies.slice(0, 12),
    primeMovies: primeMoviesData.movies.slice(0, 12),
    appleMovies: appleMoviesData.movies.slice(0, 12),
    disneyMovies: disneyMoviesData.movies.slice(0, 12),
    hboMovies: hboMoviesData.movies.slice(0, 12),
    peacockMovies: peacockMoviesData.movies.slice(0, 12),
  };
}

export default async function MoviesPage() {
  const { 
    popularMovies,
    netflixMovies,
    primeMovies,
    appleMovies,
    disneyMovies,
    hboMovies,
    peacockMovies,
  } = await getMoviesPageData();

  const allMovies = [...popularMovies, ...netflixMovies, ...primeMovies, ...appleMovies, ...disneyMovies, ...hboMovies, ...peacockMovies];

  return (
    <PageContainer>
      <SectionTitle>Browse Movies</SectionTitle>
      <p className="mb-8 text-muted-foreground">Explore our vast collection of movies from different categories.</p>
      
      {popularMovies.length > 0 && (
        <MovieSection 
          title={<><span className="text-now-playing">Now Playing</span> 🍿🌟</>}
          items={popularMovies} 
          href="/trending"
        />
      )}
      
      {netflixMovies.length > 0 && (
        <MovieSection 
          title={<><span className="text-netflix">Netflix Originals</span> 🎬🔥</>} 
          items={netflixMovies}
          href="/service/netflix/movies" 
        />
      )}

      {primeMovies.length > 0 && (
        <MovieSection 
          title={<><span className="text-prime">Prime Video</span> 🔷</>} 
          items={primeMovies} 
          href="/service/prime/movies"
        />
      )}

      {appleMovies.length > 0 && (
        <MovieSection 
          title={<><span className="text-apple">Apple TV+</span> 🍏</>} 
          items={appleMovies} 
          href="/service/apple/movies"
        />
      )}

      {disneyMovies.length > 0 && (
        <MovieSection 
          title={<><span className="text-disney">Disney+</span> 🐭✨</>} 
          items={disneyMovies} 
          href="/service/disney/movies"
        />
      )}

      {hboMovies.length > 0 && (
        <MovieSection 
          title={<><span className="text-hbo">HBO Max</span> 💜🛡️</>} 
          items={hboMovies} 
          href="/service/hbo/movies"
        />
      )}

      {peacockMovies.length > 0 && (
        <MovieSection 
          title={<><span className="text-peacock">Peacock</span> 🪄🌈</>} 
          items={peacockMovies} 
          href="/service/peacock/movies"
        />
      )}

      {allMovies.length === 0 && (
        <p className="text-muted-foreground text-center py-10">
          Could not load movies at the moment. Please ensure your TMDb API key is correct or try again later.
        </p>
      )}
    </PageContainer>
  );
}
