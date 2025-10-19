
import PageContainer from '@/components/shared/PageContainer';
import SectionTitle from '@/components/shared/SectionTitle';
import MovieGrid from '@/components/movie/MovieGrid';
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

  const trendingAnime = trending.movies.slice(0, 6);
  const upcomingAnime = upcoming.movies.slice(0, 6);
  const topRatedAnime = topRated.movies.slice(0, 6);

  return (
    <PageContainer>
      <SectionTitle className="text-center !text-5xl !font-bold text-primary neon-glow-primary mb-6">
        Anime World
      </SectionTitle>
      
      <div className="flex justify-center gap-4 mb-10">
        <Link href="/anime/trending" passHref>
          <Button variant="outline" className="text-lg bg-card hover:bg-primary/20 hover:text-accent">
            <Flame className="mr-2 h-5 w-5" /> Trending
          </Button>
        </Link>
        <Link href="/anime/upcoming" passHref>
          <Button variant="outline" className="text-lg bg-card hover:bg-primary/20 hover:text-accent">
            <Calendar className="mr-2 h-5 w-5" /> Upcoming
          </Button>
        </Link>
        <Link href="/anime/top-rated" passHref>
          <Button variant="outline" className="text-lg bg-card hover:bg-primary/20 hover:text-accent">
            <Star className="mr-2 h-5 w-5" /> Top Rated
          </Button>
        </Link>
      </div>

      {trendingAnime.length === 0 && upcomingAnime.length === 0 && topRatedAnime.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl text-muted-foreground">Loading anime...</p>
          <p className="text-sm text-muted-foreground">Please wait a moment or ensure your TMDb API key is correct.</p>
        </div>
      ) : (
        <>
          {trendingAnime.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-accent">🔥 Trending Anime</h2>
              <MovieGrid items={trendingAnime} />
            </section>
          )}

          {upcomingAnime.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-accent">🌸 Upcoming Anime</h2>
              <MovieGrid items={upcomingAnime} />
            </section>
          )}

          {topRatedAnime.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4 text-accent">⭐ Top Rated Anime</h2>
              <MovieGrid items={topRatedAnime} />
            </section>
          )}
        </>
      )}
    </PageContainer>
  );
}
