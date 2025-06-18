import HeroCarousel from '@/components/movie/HeroCarousel';
import MovieSection from '@/components/movie/MovieSection';
import PageContainer from '@/components/shared/PageContainer';
import { getPopularMovies, getUpcomingMovies, getTopRatedMovies } from '@/lib/tmdb';
import type { Movie } from '@/lib/types'; // TVShow can be used later
import { placeholderTVShows } from '@/lib/placeholder-data'; // Keep for TV shows for now

// Simulate fetching data
async function getHomePageData() {
  try {
    const [popularMovies, upcomingMovies, topRatedMovies] = await Promise.all([
      getPopularMovies(),
      getUpcomingMovies(),
      getTopRatedMovies(),
    ]);

    const heroMovies = popularMovies.slice(0, 5) as Movie[];
    const trending = popularMovies.slice(0, 6) as Movie[]; // Using popular as trending
    const newReleases = upcomingMovies.slice(0, 6) as Movie[];
    const topRated = topRatedMovies.slice(0, 6) as Movie[];
    
    // Placeholder for AI recommendations or curated list - can be movies or TV shows
    // For now, mixing some fetched movies and placeholder TV shows
    const recommended = [...topRatedMovies.slice(6, 9), ...placeholderTVShows.slice(0,3)].sort(() => 0.5 - Math.random()).slice(0, 6);


    return { heroMovies, trending, newReleases, topRated, recommended };
  } catch (error) {
    console.error("Failed to fetch homepage data from TMDb:", error);
    // Fallback to empty arrays or placeholder data if needed
    return { 
      heroMovies: [], 
      trending: [], 
      newReleases: [], 
      topRated: [], 
      recommended: placeholderTVShows.slice(0, 6) // Fallback recommended
    };
  }
}

export default async function HomePage() {
  const { heroMovies, trending, newReleases, topRated, recommended } = await getHomePageData();

  return (
    <>
      <HeroCarousel movies={heroMovies} />
      <PageContainer>
        {trending.length > 0 && <MovieSection title="Trending Movies" items={trending} />}
        {newReleases.length > 0 && <MovieSection title="Upcoming Movies" items={newReleases} />}
        {topRated.length > 0 && <MovieSection title="Top Rated Movies" items={topRated} />}
        {/* Recommended can mix movies and TV shows, MovieSection component needs to handle mixed types or be split */}
        {recommended.length > 0 && <MovieSection title="Recommended For You" items={recommended} />}
      </PageContainer>
    </>
  );
}
