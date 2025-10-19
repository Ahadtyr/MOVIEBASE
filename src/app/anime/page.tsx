
import PageContainer from '@/components/shared/PageContainer';
import SectionTitle from '@/components/shared/SectionTitle';
import MovieGrid from '@/components/movie/MovieGrid';
import { getTrendingAnime, getUpcomingAnime, getTopRatedAnime } from '@/lib/tmdb';

export default async function AnimePage() {
  const trendingPromise = getTrendingAnime(1);
  const upcomingPromise = getUpcomingAnime(1);
  const topRatedPromise = getTopRatedAnime(1);

  const [trending, upcoming, topRated] = await Promise.all([
    trendingPromise,
    upcomingPromise,
    topRatedPromise,
  ]);

  const trendingAnime = trending.movies;
  const upcomingAnime = upcoming.movies;
  const topRatedAnime = topRated.movies;

  return (
    <PageContainer>
      <SectionTitle className="text-center !text-5xl !font-bold text-primary neon-glow-primary mb-10">
        Anime World
      </SectionTitle>

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
