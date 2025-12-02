
import PageContainer from '@/components/shared/PageContainer';
import SectionTitle from '@/components/shared/SectionTitle';
import MovieSection from '@/components/movie/MovieSection';
import { getPopularMovies, getTopRatedMovies, getDiscoverMoviesByParams } from '@/lib/tmdb';

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
    topRatedMoviesData,
    netflixMoviesData,
    primeMoviesData,
    appleMoviesData,
    disneyMoviesData,
    hboMoviesData,
    peacockMoviesData,
    trendingIndianData,
    bollywoodPicksData,
  ] = await Promise.all([
    getPopularMovies(),
    getTopRatedMovies(),
    getDiscoverMoviesByParams({ ...commonParams, with_watch_providers: NETFLIX_ID }),
    getDiscoverMoviesByParams({ ...commonParams, with_watch_providers: PRIME_VIDEO_ID }),
    getDiscoverMoviesByParams({ ...commonParams, with_watch_providers: APPLE_TV_ID }),
    getDiscoverMoviesByParams({ ...commonParams, with_watch_providers: DISNEY_PLUS_ID }),
    getDiscoverMoviesByParams({ ...commonParams, with_watch_providers: HBO_MAX_ID }),
    getDiscoverMoviesByParams({ ...commonParams, with_watch_providers: PEACOCK_ID }),
    getDiscoverMoviesByParams({ with_origin_country: 'IN', sort_by: 'popularity.desc' }),
    getDiscoverMoviesByParams({ with_original_language: 'hi', sort_by: 'popularity.desc', 'vote_count.gte': '100' }),
  ]);
  
  return { 
    popularMovies: popularMoviesData.slice(0, 12),
    topRatedMovies: topRatedMoviesData.slice(0, 12),
    netflixMovies: netflixMoviesData.movies.slice(0, 12),
    primeMovies: primeMoviesData.movies.slice(0, 12),
    appleMovies: appleMoviesData.movies.slice(0, 12),
    disneyMovies: disneyMoviesData.movies.slice(0, 12),
    hboMovies: hboMoviesData.movies.slice(0, 12),
    peacockMovies: peacockMoviesData.movies.slice(0, 12),
    trendingIndian: trendingIndianData.movies.slice(0, 12),
    bollywoodPicks: bollywoodPicksData.movies.slice(0, 12),
  };
}

export default async function MoviesPage() {
  const { 
    popularMovies,
    topRatedMovies,
    netflixMovies,
    primeMovies,
    appleMovies,
    disneyMovies,
    hboMovies,
    peacockMovies,
    trendingIndian,
    bollywoodPicks,
  } = await getMoviesPageData();

  const allContent = [...popularMovies, ...topRatedMovies, ...netflixMovies, ...primeMovies, ...appleMovies, ...disneyMovies, ...hboMovies, ...peacockMovies, ...trendingIndian, ...bollywoodPicks];

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

      {trendingIndian.length > 0 && (
        <MovieSection 
          title={<><span className="text-india">Trending Indian</span> 🇮🇳🔥</>} 
          items={trendingIndian}
          href="/country/IN/movies"
        />
      )}
      
      {topRatedMovies.length > 0 && (
        <MovieSection 
          title={<><span className="text-top-rated">Top Rated</span> ⭐</>}
          items={topRatedMovies} 
          href="/movies/top-rated"
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

      {bollywoodPicks.length > 0 && (
        <MovieSection 
          title={<><span className="text-bollywood">Bollywood Picks</span> 🍿🎥</>} 
          items={bollywoodPicks}
        />
      )}

      {allContent.length === 0 && (
        <p className="text-muted-foreground text-center py-10">
          Could not load movies at the moment. Please ensure your TMDb API key is correct or try again later.
        </p>
      )}
    </PageContainer>
  );
}
