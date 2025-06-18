import PageContainer from '@/components/shared/PageContainer';
import SectionTitle from '@/components/shared/SectionTitle';
import MovieSection from '@/components/movie/MovieSection';
import { placeholderMovies, placeholderGenres } from '@/lib/placeholder-data';
import { notFound } from 'next/navigation';
// import type { Movie } from '@/lib/types'; // Will be TMDb Movie type

// export async function generateStaticParams() {
// This will need to fetch genre list from TMDb if we want to pre-render
// For now, it will be fully dynamic
// return placeholderGenres.map((genre) => ({
//   slug: genre.toLowerCase().replace(/\s+/g, '-'),
// }));
// }

interface GenrePageProps {
  params: { slug: string };
}

export default async function GenrePage({ params }: GenrePageProps) {
  // TODO: Fetch movies for this genre slug from TMDb
  // The slug might need to map to a TMDb genre ID
  const genreName = params.slug.replace(/-/g, ' ');
  const capitalizedGenreName = genreName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  // Using placeholder data until TMDb genre fetching is implemented
  const moviesInGenre = placeholderMovies.filter(movie => 
    movie.genres.some(g => g.toLowerCase() === genreName)
  );

  // This check also needs to be updated for TMDb genres
  if (moviesInGenre.length === 0 && !placeholderGenres.map(g => g.toLowerCase()).includes(genreName)) {
    notFound();
  }

  return (
    <PageContainer>
      <SectionTitle>{capitalizedGenreName} Movies</SectionTitle>
      {/* This MovieSection will eventually take TMDb Movie types */}
      {moviesInGenre.length > 0 ? (
        <MovieSection title="" items={moviesInGenre} />
      ) : (
        <p className="text-muted-foreground">No movies found in the {capitalizedGenreName} genre yet. Check back soon!</p>
      )}
    </PageContainer>
  );
}
