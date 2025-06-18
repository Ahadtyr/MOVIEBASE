import HeroCarousel from '@/components/movie/HeroCarousel';
import MovieSection from '@/components/movie/MovieSection';
import PageContainer from '@/components/shared/PageContainer';
import { placeholderMovies, placeholderTVShows } from '@/lib/placeholder-data';
import type { Movie, TVShow } from '@/lib/types';

// Simulate fetching data
async function getHomePageData() {
  // For demonstration, shuffle and slice data
  const trending = [...placeholderMovies, ...placeholderTVShows].sort(() => 0.5 - Math.random()).slice(0, 6);
  const newReleases = [...placeholderMovies].sort((a,b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()).slice(0, 6);
  const topRated = [...placeholderMovies, ...placeholderTVShows].sort((a,b) => b.rating - a.rating).slice(0, 6);
  const recommended = [...placeholderMovies].sort(() => 0.5 - Math.random()).slice(0, 6); // Placeholder for AI recommendations or curated list
  const heroMovies = placeholderMovies.slice(0,5) as Movie[]; // Ensure hero only gets movies

  return { heroMovies, trending, newReleases, topRated, recommended };
}

export default async function HomePage() {
  const { heroMovies, trending, newReleases, topRated, recommended } = await getHomePageData();

  return (
    <>
      <HeroCarousel movies={heroMovies} />
      <PageContainer>
        <MovieSection title="Trending Now" items={trending} />
        <MovieSection title="New Releases" items={newReleases} />
        <MovieSection title="Top Rated" items={topRated} />
        <MovieSection title="Recommended For You" items={recommended} />
      </PageContainer>
    </>
  );
}
