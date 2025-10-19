import PageContainer from '@/components/shared/PageContainer';
import SectionTitle from '@/components/shared/SectionTitle';
import MovieGrid from '@/components/movie/MovieGrid';
import PaginationControls from '@/components/shared/PaginationControls';
import { getMovieGenres, getDiscoverMovies } from '@/lib/tmdb';
import { notFound } from 'next/navigation';

interface GenrePageProps {
  params: { slug: string };
  searchParams?: { page?: string };
}

export default async function GenrePage({ params, searchParams }: GenrePageProps) {
  const allGenres = await getMovieGenres();
  const genre = allGenres.find(g => g.name.toLowerCase().replace(/\s+/g, '-') === params.slug);

  if (!genre) {
    notFound();
  }
  
  const currentPage = Number(searchParams?.page) || 1;
  const { movies: moviesInGenre, totalPages } = await getDiscoverMovies(genre.id.toString(), currentPage);

  return (
    <PageContainer>
      <SectionTitle>{genre.name} Movies</SectionTitle>
      {moviesInGenre.length > 0 ? (
        <>
          <MovieGrid items={moviesInGenre} />
          <PaginationControls
            totalPages={totalPages}
            currentPage={currentPage}
            basePath={`/genre/${params.slug}`}
          />
        </>
      ) : (
        <p className="text-muted-foreground">No movies found in the {genre.name} genre yet. Check back soon!</p>
      )}
    </PageContainer>
  );
}
