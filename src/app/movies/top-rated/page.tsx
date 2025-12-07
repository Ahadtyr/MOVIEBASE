
import PageContainer from '@/components/shared/PageContainer';
import SectionTitle from '@/components/shared/SectionTitle';
import MovieGrid from '@/components/movie/MovieGrid';
import PaginationControls from '@/components/shared/PaginationControls';
import { getTopRatedMovies } from '@/lib/tmdb';

interface TopRatedPageProps {
  searchParams?: { page?: string };
}

export default async function TopRatedPage({ searchParams }: TopRatedPageProps) {
  const currentPage = Number(searchParams?.page) || 1;
  const { movies: topRatedMovies, totalPages } = await getTopRatedMovies(currentPage);

  return (
    <PageContainer>
      <SectionTitle>Top Rated Movies</SectionTitle>
      <p className="mb-8 text-muted-foreground">The best movies of all time, as rated by fans.</p>
      {topRatedMovies.length > 0 ? (
        <>
          <MovieGrid items={topRatedMovies} />
          <PaginationControls
            totalPages={totalPages}
            currentPage={currentPage}
            basePath="/movies/top-rated"
          />
        </>
      ) : (
        <p className="text-muted-foreground">Could not load top rated movies. Please try again later.</p>
      )}
    </PageContainer>
  );
}
