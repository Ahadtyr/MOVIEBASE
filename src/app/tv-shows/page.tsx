
import PageContainer from '@/components/shared/PageContainer';
import SectionTitle from '@/components/shared/SectionTitle';
import MovieSection from '@/components/movie/MovieSection';
import { getPopularTVShows, getDiscoverTVShowsByParams } from '@/lib/tmdb';

// Network IDs for TV shows
const NETFLIX_ID = '213';
const PRIME_VIDEO_ID = '1024';
const APPLE_TV_ID = '2552';
const DISNEY_PLUS_ID = '2739';
const HBO_MAX_ID = '3186';
const PEACOCK_ID = '3353';

async function getTVShowsPageData() {
  const [
    popularShows,
    netflixShows,
    primeShows,
    appleShows,
    disneyShows,
    hboShows,
    peacockShows,
  ] = await Promise.all([
    getPopularTVShows(),
    getDiscoverTVShowsByParams({ with_networks: NETFLIX_ID }),
    getDiscoverTVShowsByParams({ with_networks: PRIME_VIDEO_ID }),
    getDiscoverTVShowsByParams({ with_networks: APPLE_TV_ID }),
    getDiscoverTVShowsByParams({ with_networks: DISNEY_PLUS_ID }),
    getDiscoverTVShowsByParams({ with_networks: HBO_MAX_ID }),
    getDiscoverTVShowsByParams({ with_networks: PEACOCK_ID }),
  ]);
  
  return { 
    popularShows: popularShows.slice(0, 12),
    netflixShows: netflixShows.slice(0, 12),
    primeShows: primeShows.slice(0, 12),
    appleShows: appleShows.slice(0, 12),
    disneyShows: disneyShows.slice(0, 12),
    hboShows: hboShows.slice(0, 12),
    peacockShows: peacockShows.slice(0, 12),
  };
}

export default async function TVShowsPage() {
  const { 
    popularShows,
    netflixShows,
    primeShows,
    appleShows,
    disneyShows,
    hboShows,
    peacockShows,
   } = await getTVShowsPageData();
   
  const allShows = [...popularShows, ...netflixShows, ...primeShows, ...appleShows, ...disneyShows, ...hboShows, ...peacockShows];

  return (
    <PageContainer>
      <SectionTitle>Browse TV Shows</SectionTitle>
      <p className="mb-8 text-muted-foreground">Explore binge-worthy TV series from around the world.</p>
      
      {popularShows.length > 0 && (
        <MovieSection title="Popular TV Shows" items={popularShows} />
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

      {allShows.length === 0 && (
        <p className="text-muted-foreground text-center py-10">
          Could not load TV shows at the moment. Please ensure your TMDb API key is correct or try again later.
        </p>
      )}
    </PageContainer>
  );
}
