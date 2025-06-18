import { notFound } from 'next/navigation';
import { getMovieDetails, getMovieCredits, getSimilarMovies, IMAGE_BASE_URL_W500, IMAGE_BASE_URL_ORIGINAL } from '@/lib/tmdb';
import MovieDetailsBanner from '@/components/movie/MovieDetailsBanner';
import CastList from '@/components/movie/CastList';
import PageContainer from '@/components/shared/PageContainer';
import SectionTitle from '@/components/shared/SectionTitle';
import MovieSection from '@/components/movie/MovieSection';
import type { Movie, TMDBCastMember } from '@/lib/types';

interface MovieDetailPageProps {
  params: { id: string };
}

export default async function MovieDetailPage({ params }: MovieDetailPageProps) {
  const movieId = parseInt(params.id, 10);
  if (isNaN(movieId)) {
    notFound();
  }

  const itemPromise = getMovieDetails(movieId);
  const creditsPromise = getMovieCredits(movieId);
  const similarMoviesPromise = getSimilarMovies(movieId);

  const [item, credits, similarMoviesData] = await Promise.all([
    itemPromise,
    creditsPromise,
    similarMoviesPromise
  ]);

  if (!item) {
    notFound();
  }

  const cast: TMDBCastMember[] = credits.cast.slice(0, 12); // Limit cast members displayed
  const similarMovies: Movie[] = similarMoviesData.slice(0, 6);

  return (
    <>
      <MovieDetailsBanner item={item} />
      <PageContainer className="pt-24 md:pt-16"> {/* Adjust padding top due to banner overlap */}
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
              <li><strong>Release Date:</strong> {new Date(item.release_date).toLocaleDateString()}</li>
              <li><strong>Rating:</strong> {item.vote_average.toFixed(1)}/10</li>
              {item.runtime && <li><strong>Duration:</strong> {Math.floor(item.runtime / 60)}h {item.runtime % 60}m</li>}
              <li><strong>Genres:</strong> {item.genres.map(g => g.name).join(', ')}</li>
            </ul>
          </aside>
        </div>
        {similarMovies.length > 0 && (
          <MovieSection title="More Like This" items={similarMovies} />
        )}
      </PageContainer>
    </>
  );
}
