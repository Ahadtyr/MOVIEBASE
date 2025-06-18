import { notFound } from 'next/navigation';
import { getContentById } from '@/lib/placeholder-data';
import MovieDetailsBanner from '@/components/movie/MovieDetailsBanner';
import CastList from '@/components/movie/CastList';
import PageContainer from '@/components/shared/PageContainer';
import SectionTitle from '@/components/shared/SectionTitle';
import MovieSection from '@/components/movie/MovieSection';
import { placeholderMovies } from '@/lib/placeholder-data'; // For related movies

export async function generateStaticParams() {
  // In a real app, fetch all movie IDs
  const movies = placeholderMovies.slice(0, 5); // Limit for build time
  return movies.map((movie) => ({
    id: movie.id,
  }));
}

interface MovieDetailPageProps {
  params: { id: string };
}

export default async function MovieDetailPage({ params }: MovieDetailPageProps) {
  const item = getContentById(params.id);

  if (!item) {
    notFound();
  }

  // Simulate related movies
  const relatedMovies = placeholderMovies.filter(m => m.id !== item.id && m.genres.some(g => item.genres.includes(g))).slice(0,6);

  return (
    <>
      <MovieDetailsBanner item={item} />
      <PageContainer className="pt-24 md:pt-16"> {/* Adjust padding top due to banner overlap */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <section id="details" className="mb-8">
              <SectionTitle>Synopsis</SectionTitle>
              <p className="text-base md:text-lg text-foreground/80 leading-relaxed whitespace-pre-line">
                {item.synopsis}
              </p>
            </section>
            
            <CastList cast={item.cast} />
          </div>
          <aside className="md:col-span-1">
            {/* You can add more details here like director, writer, awards etc. */}
            <SectionTitle>Details</SectionTitle>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><strong>Release Date:</strong> {new Date(item.releaseDate).toLocaleDateString()}</li>
              <li><strong>Rating:</strong> {item.rating}/10</li>
              {'duration' in item && <li><strong>Duration:</strong> {item.duration}</li>}
              {'seasons' in item && <li><strong>Seasons:</strong> {item.seasons}</li>}
              {'episodes' in item && <li><strong>Episodes:</strong> {item.episodes}</li>}
              <li><strong>Genres:</strong> {item.genres.join(', ')}</li>
            </ul>
          </aside>
        </div>
        {relatedMovies.length > 0 && (
          <MovieSection title="More Like This" items={relatedMovies} />
        )}
      </PageContainer>
    </>
  );
}
