
import PageContainer from '@/components/shared/PageContainer';
import SectionTitle from '@/components/shared/SectionTitle';
import MovieSection from '@/components/movie/MovieSection';
import { getTrendingAnime, getUpcomingAnime, getTopRatedAnime } from '@/lib/tmdb';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Flame, Calendar, Star } from 'lucide-react';

export default async function AnimePage() {
  const trendingPromise = getTrendingAnime(1);
  const upcomingPromise = getUpcomingAnime(1);
  const topRatedPromise = getTopRatedAnime(1);

  const [trending, upcoming, topRated] = await Promise.all([
    trendingPromise,
    upcomingPromise,
    topRatedPromise,
  ]);

  const trendingAnime = trending.movies.slice(0, 12);
  const upcomingAnime = upcoming.movies.slice(0, 12);
  const topRatedAnime = topRated.movies.slice(0, 12);

  return (
    <PageContainer>
      <SectionTitle className="text-center !text-5xl !font-bold text-primary neon-glow-primary mb-6">
        Anime World
      </SectionTitle>
      
      <div className="flex justify-center gap-4 mb-10">
        <Link href="/anime/trending" passHref>
          <Button variant="outline" className="text-lg bg-card hover:bg-primary/20 hover:text-accent transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-accent/30 transform hover:scale-105 border-accent/30 hover:border-accent">
            <Flame className="mr-2 h-5 w-5 text-accent neon-glow" /> Trending
          </Button>
        </Link>
        <Link href="/anime/upcoming" passHref>
          <Button variant="outline" className="text-lg bg-card hover:bg-primary/20 hover:text-accent transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-accent/30 transform hover:scale-105 border-accent/30 hover:border-accent">
            <Calendar className="mr-2 h-5 w-5 text-accent neon-glow" /> Upcoming
          </Button>
        </Link>
        <Link href="/anime/top-rated" passHref>
          <Button variant="outline" className="text-lg bg-card hover:bg-primary/20 hover:text-accent transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-accent/30 transform hover:scale-105 border-accent/30 hover:border-accent">
            <Star className="mr-2 h-5 w-5 text-accent neon-glow" /> Top Rated
          </Button>
        </Link>
      </div>

      {(trendingAnime.length === 0 && upcomingAnime.length === 0 && topRatedAnime.length === 0) ? (
        <div className="text-center py-10">
          <p className="text-xl text-muted-foreground">Loading anime...</p>
          <p className="text-sm text-muted-foreground">Please wait a moment or ensure your TMDb API key is correct.</p>
        </div>
      ) : (
        <>
          {trendingAnime.length > 0 && (
            <MovieSection title="🔥 Trending Anime" items={trendingAnime} href="/anime/trending" />
          )}

          {upcomingAnime.length > 0 && (
            <MovieSection title="🌸 Upcoming Anime" items={upcomingAnime} href="/anime/upcoming" />
          )}

          {topRatedAnime.length > 0 && (
            <MovieSection title="⭐ Top Rated Anime" items={topRatedAnime} href="/anime/top-rated" />
          )}
        </>
      )}
    </PageContainer>
  );
}
