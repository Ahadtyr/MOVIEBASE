import HeroCarousel from '@/components/movie/HeroCarousel';
import MovieSection from '@/components/movie/MovieSection';
import PageContainer from '@/components/shared/PageContainer';
import { getPopularMovies, getUpcomingMovies, getTopRatedMovies, getTopRatedTVShows } from '@/lib/tmdb';
import type { Movie, TVShow } from '@/lib/types';

// Simulate fetching data
async function getHomePageData() {
  try {
    const [popularMovies, upcomingMovies, topRatedMovies, topRatedTVShows] = await Promise.all([
      getPopularMovies(),
      getUpcomingMovies(),
      getTopRatedMovies(),
      getTopRatedTVShows(),
    ]);

    const heroMovies = popularMovies.slice(0, 5) as Movie[];
    const trending = popularMovies.slice(0, 12) as Movie[]; // Using popular as trending
    const newReleases = upcomingMovies.slice(0, 12) as Movie[];
    const topRated = topRatedMovies.slice(0, 12) as Movie[];
    
    // Mix top-rated movies and TV shows for recommendations
    const recommended = [...topRatedMovies.slice(12, 18), ...topRatedTVShows.slice(0, 6)]
      .sort(() => 0.5 - Math.random())
      .slice(0, 12) as (Movie | TVShow)[];

    return { heroMovies, trending, newReleases, topRated, recommended };
  } catch (error) {
    console.error("Failed to fetch homepage data from TMDb:", error);
    // Fallback to empty arrays if an error occurs (e.g., missing API key)
    return { 
      heroMovies: [], 
      trending: [], 
      newReleases: [], 
      topRated: [], 
      recommended: []
    };
  }
}

export default async function HomePage() {
  const { heroMovies, trending, newReleases, topRated, recommended } = await getHomePageData();

  return (
    <>
      <HeroCarousel movies={heroMovies} />
      <PageContainer>
        {trending.length > 0 && <MovieSection title="Trending Movies" items={trending} href="/movies" />}
        {newReleases.length > 0 && <MovieSection title="Upcoming Movies" items={newReleases} />}
        {topRated.length > 0 && <MovieSection title="Top Rated Movies" items={topRated} />}
        {recommended.length > 0 && <MovieSection title="Recommended For You" items={recommended} />}
        
        {heroMovies.length === 0 && (
           <div className="text-center py-10">
            <p className="text-xl text-muted-foreground">Could not load movies.</p>
            <p className="text-sm text-muted-foreground">Please check your TMDb API key and try again.</p>
          </div>
        )}
      </PageContainer>
    </>
  );
}
