import { notFound } from 'next/navigation';
import { getTVShowDetails, getTVShowCredits, getSimilarTVShows } from '@/lib/tmdb';
import MovieDetailsBanner from '@/components/movie/MovieDetailsBanner';
import CastList from '@/components/movie/CastList';
import PageContainer from '@/components/shared/PageContainer';
import SectionTitle from '@/components/shared/SectionTitle';
import MovieSection from '@/components/movie/MovieSection';
import type { TVShow, TMDBCastMember } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlayCircle } from 'lucide-react';

interface TVShowDetailPageProps {
  params: { id: string };
}

export default async function TVShowDetailPage({ params }: TVShowDetailPageProps) {
  const tvShowId = parseInt(params.id, 10);
  if (isNaN(tvShowId)) {
    notFound();
  }

  const itemPromise = getTVShowDetails(tvShowId);
  const creditsPromise = getTVShowCredits(tvShowId);
  const similarShowsPromise = getSimilarTVShows(tvShowId);

  const [item, credits, similarShowsData] = await Promise.all([
    itemPromise,
    creditsPromise,
    similarShowsPromise,
  ]);

  if (!item) {
    notFound();
  }

  const cast: TMDBCastMember[] = credits.cast.slice(0, 12);
  const similarShows: TVShow[] = similarShowsData.slice(0, 6);

  // For TV, default to season 1, episode 1 for the player link
  const playerHref = `/player/tv/${item.id}?s=1&e=1`;

  return (
    <>
      <MovieDetailsBanner item={item} /> 
      <PageContainer className="pt-24 md:pt-16">

        <div className="mb-8">
          <Link href={playerHref} passHref>
            <Button size="lg" className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg py-7">
              <PlayCircle className="mr-2 h-6 w-6 neon-glow" /> Watch Season 1, Episode 1
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <section id="details" className="mb-8">
              <SectionTitle>Synopsis</SectionTitle>
              <p className="text-base md:text-lg text-foreground/80 leading-relaxed whitespace-pre-line">
                {item.overview}
              </p>
            </section>
            
            <CastList cast={cast} />
          </div>
          <aside className="md:col-span-1">
            <SectionTitle>Details</SectionTitle>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><strong>First Aired:</strong> {new Date(item.first_air_date).toLocaleDateString()}</li>
              <li><strong>Rating:</strong> {item.vote_average.toFixed(1)}/10</li>
              {item.number_of_seasons && <li><strong>Seasons:</strong> {item.number_of_seasons}</li>}
              {item.number_of_episodes && <li><strong>Episodes:</strong> {item.number_of_episodes}</li>}
              <li><strong>Genres:</strong> {item.genres.map(g => g.name).join(', ')}</li>
            </ul>
          </aside>
        </div>
        {similarShows.length > 0 && (
          <MovieSection title="You Might Also Like" items={similarShows} />
        )}
      </PageContainer>
    </>
  );
}
