
import PageContainer from '@/components/shared/PageContainer';
import SectionTitle from '@/components/shared/SectionTitle';
import MovieGrid from '@/components/movie/MovieGrid';
import PaginationControls from '@/components/shared/PaginationControls';
import { getMoviesByCategory, type BrowseCategory } from '@/lib/tmdb';
import { notFound } from 'next/navigation';
import { capitalize } from '@/lib/utils';

interface BrowsePageProps {
  params: { category: string };
  searchParams?: { page?: string };
}

const VALID_CATEGORIES: BrowseCategory[] = ['bollywood', 'hollywood', 'anime'];

function isValidCategory(category: string): category is BrowseCategory {
    return VALID_CATEGORIES.includes(category as BrowseCategory);
}

export default async function BrowsePage({ params, searchParams }: BrowsePageProps) {
  const { category } = params;

  if (!isValidCategory(category)) {
    notFound();
  }

  const currentPage = Number(searchParams?.page) || 1;
  const { movies, totalPages } = await getMoviesByCategory(category, currentPage);
  
  const pageTitle = `${capitalize(category)} Movies`;
  const pageDescription = `Explore the latest and greatest from ${capitalize(category)}.`;


  return (
    <PageContainer>
      <SectionTitle>{pageTitle}</SectionTitle>
      <p className="mb-8 text-muted-foreground">{pageDescription}</p>
      {movies.length > 0 ? (
        <>
          <MovieGrid items={movies} />
          <PaginationControls
            totalPages={totalPages}
            currentPage={currentPage}
            basePath={`/browse/${category}`}
          />
        </>
      ) : (
        <p className="text-muted-foreground">No movies found in the {category} category yet. Check back soon!</p>
      )}
    </PageContainer>
  );
}
