
import PageContainer from '@/components/shared/PageContainer';
import SectionTitle from '@/components/shared/SectionTitle';
import MovieSection from '@/components/movie/MovieSection';
import { getPopularTVShows, getTopRatedTVShows, getDiscoverTVShowsByParams } from '@/lib/tmdb';

// Network IDs for TV shows
const NETFLIX_ID = '213';
const PRIME_VIDEO_ID = '1024';
const APPLE_TV_ID = '2552';
const DISNEY_PLUS_ID = '2739';
const HBO_MAX_ID = '3186';
const PEACOCK_ID = '3353';

async function getTVShowsPageData() {
  const [
    popularShowsData,
    topRatedShowsData,
    netflixShowsData,
    primeShowsData,
    appleShowsData,
    disneyShowsData,
    hboShowsData,
    peacockShowsData,
    trendingIndianData,
  ] = await Promise.all([
    getPopularTVShows(),
    getTopRatedTVShows(),
    getDiscoverTVShowsByParams({ with_networks: NETFLIX_ID }),
    getDiscoverTVShowsByParams({ with_networks: PRIME_VIDEO_ID }),
    getDiscoverTVShowsByParams({ with_networks: APPLE_TV_ID }),
    getDiscoverTVShowsByParams({ with_networks: DISNEY_PLUS_ID }),
    getDiscoverTVShowsByParams({ with_networks: HBO_MAX_ID }),
    getDiscoverTVShowsByParams({ with_networks: PEACOCK_ID }),
    getDiscoverTVShowsByParams({ with_origin_country: 'IN', sort_by: 'popularity.desc' }),
  ]);
  
  return { 
    popularShows: popularShowsData.slice(0, 12),
    topRatedShows: topRatedShowsData.slice(0, 12),
    netflixShows: netflixShowsData.shows.slice(0, 12),
    primeShows: primeShowsData.shows.slice(0, 12),
    appleShows: appleShowsData.shows.slice(0, 12),
    disneyShows: disneyShowsData.shows.slice(0, 12),
    hboShows: hboShowsData.shows.slice(0, 12),
    peacockShows: peacockShowsData.shows.slice(0, 12),
    trendingIndianShows: trendingIndianData.shows.slice(0, 12),
  };
}

export default async function TVShowsPage() {
  const { 
    popularShows,
    topRatedShows,
    netflixShows,
    primeShows,
    appleShows,
    disneyShows,
    hboShows,
    peacockShows,
    trendingIndianShows,
   } = await getTVShowsPageData();
   
  const allShows = [...popularShows, ...topRatedShows, ...netflixShows, ...primeShows, ...appleShows, ...disneyShows, ...hboShows, ...peacockShows, ...trendingIndianShows];

  return (
    <PageContainer>
      <SectionTitle>Browse TV Shows</SectionTitle>
      <p className="mb-8 text-muted-foreground">Explore binge-worthy TV series from around the world.</p>
      
      {popularShows.length > 0 && (
        <MovieSection 
          title={<><span className="text-trending">Trending Now</span> ⚡</>}
          items={popularShows} 
        />
      )}

      {topRatedShows.length > 0 && (
        <MovieSection 
          title={<><span className="text-top-rated">Top Rated</span> ⭐</>}
          items={topRatedShows}
        />
      )}
      
      {netflixShows.length > 0 && (
        <MovieSection 
          title={<><span className="text-netflix">Netflix Originals</span> 🎬🔥</>} 
          items={netflixShows}
          href="/service/netflix/tv"
        />
      )}

      {primeShows.length > 0 && (
        <MovieSection 
          title={<><span className="text-prime">Prime Video</span> 🔷</>} 
          items={primeShows}
          href="/service/prime/tv"
        />
      )}

      {appleShows.length > 0 && (
        <MovieSection 
          title={<><span className="text-apple">Apple TV+</span> 🍏</>} 
          items={appleShows}
          href="/service/apple/tv"
        />
      )}

      {disneyShows.length > 0 && (
        <MovieSection 
          title={<><span className="text-disney">Disney+</span> 🐭✨</>} 
          items={disneyShows}
          href="/service/disney/tv"
        />
      )}

      {hboShows.length > 0 && (
        <MovieSection 
          title={<><span className="text-hbo">HBO Max</span> 💜🛡️</>} 
          items={hboShows}
          href="/service/hbo/tv"
        />
      )}

      {peacockShows.length > 0 && (
        <MovieSection 
          title={<><span className="text-peacock">Peacock</span> 🪄🌈</>} 
          items={peacockShows}
          href="/service/peacock/tv"
        />
      )}

       {trendingIndianShows.length > 0 && (
        <MovieSection 
          title={<><span className="text-india">Trending Indian</span> 🇮🇳🔥</>} 
          items={trendingIndianShows}
          href="/country/IN/tv"
        />
      )}

      {allShows.length === 0 && (
        <p className="text-muted-foreground text-center py-10">
          Could not load TV shows at the moment. Please ensure your TMDb API key is correct or try again later.
        </p>
      )}
    </PageContainer>
  );
}
