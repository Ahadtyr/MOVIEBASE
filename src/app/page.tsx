
import HeroCarousel from '@/components/movie/HeroCarousel';
import MovieSection from '@/components/movie/MovieSection';
import PageContainer from '@/components/shared/PageContainer';
import { getPopularMovies, getUpcomingMovies, getTopRatedMovies, getDiscoverTVShowsByParams, getItemImages, IMAGE_BASE_URL_ORIGINAL } from '@/lib/tmdb';
import type { Movie, TVShow } from '@/lib/types';
import ContinueWatching from '@/components/movie/ContinueWatching';

// Simulate fetching data
async function getHomePageData() {
  const [popularMovies, upcomingMovies, topRatedMoviesData, showsFrom2025Data] = await Promise.all([
    getPopularMovies(),
    getUpcomingMovies(),
    getTopRatedMovies(),
    getDiscoverTVShowsByParams({ 'first_air_date.gte': '2025-01-01', 'first_air_date.lte': '2025-12-31' }),
  ]);

  const topRatedMovies = topRatedMoviesData.movies;
  const showsFrom2025 = showsFrom2025Data.shows;
  
  let heroItems: (Movie | TVShow)[] = [];
  if (popularMovies.length > 0) {
    const mostTrendingMovie = popularMovies[0];
    const otherHeroItems = [...popularMovies.slice(1, 5), ...showsFrom2025.slice(0, 5)]
      .sort(() => 0.5 - Math.random()) as (Movie | TVShow)[];
    
    heroItems = [mostTrendingMovie, ...otherHeroItems].filter(Boolean);
  }

  // Fetch logos for hero items
  const heroItemsWithLogos = await Promise.all(
    heroItems.map(async (item) => {
      const type = 'name' in item ? 'tv' : 'movie';
      const images = await getItemImages(type, item.id);
      
      // Find the best logo (prefer English, then fallback to any)
      let bestLogo = images?.logos.find(logo => logo.iso_639_1 === 'en');
      if (!bestLogo) {
        bestLogo = images?.logos[0];
      }

      return {
        ...item,
        logo_path: bestLogo ? `${IMAGE_BASE_URL_ORIGINAL}${bestLogo.file_path}` : null,
      };
    })
  );

  const trending = popularMovies.slice(0, 12) as Movie[]; // Using popular as trending
  const newReleases = upcomingMovies.slice(0, 12) as Movie[];
  const topRated = topRatedMovies.slice(0, 12) as Movie[];
  
  // Mix top-rated movies and TV shows for recommendations
  const recommended = [...topRatedMovies.slice(12, 18), ...showsFrom2025.slice(0, 6)]
    .sort(() => 0.5 - Math.random())
    .slice(0, 12) as (Movie | TVShow)[];

  return { heroItems: heroItemsWithLogos, trending, newReleases, topRated, recommended };

}

export default async function HomePage() {
  const { heroItems, trending, newReleases, topRated, recommended } = await getHomePageData();

  return (
    <>
      <HeroCarousel items={heroItems} />
      <PageContainer>
        <ContinueWatching />
        {trending.length > 0 && <MovieSection title={<><span className="text-trending">Trending Movies</span> 🔥</>} items={trending} href="/trending" />}
        {newReleases.length > 0 && <MovieSection title={<><span className="text-now-playing">Upcoming Movies</span> 🚀</>} items={newReleases} />}
        {topRated.length > 0 && <MovieSection title={<><span className="text-top-rated">Top Rated Movies</span> ⭐</>} items={topRated} href="/movies/top-rated" />}
        {recommended.length > 0 && <MovieSection title={<><span className="text-hbo">Recommended For You</span> 💡</>} items={recommended} />}
        
        {heroItems.length === 0 && (
           <div className="text-center py-10">
            <p className="text-xl text-muted-foreground">Could not load movies.</p>
            <p className="text-sm text-muted-foreground">Please check your TMDb API key and try again.</p>
          </div>
        )}
      </PageContainer>
    </>
  );
}
