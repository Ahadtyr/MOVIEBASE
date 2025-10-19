
import PageContainer from '@/components/shared/PageContainer';
import SectionTitle from '@/components/shared/SectionTitle';
import MovieGrid from '@/components/movie/MovieGrid';
import PaginationControls from '@/components/shared/PaginationControls';
import { getAnimeByCategory, type AnimeCategory } from '@/lib/tmdb';
import { notFound } from 'next/navigation';
import { capitalize } from '@/lib/utils';
import type { TVShow } from '@/lib/types';

interface AnimeCategoryPageProps {
  params: { category: string };
  searchParams?: { page?: string };
}

const VALID_CATEGORIES: AnimeCategory[] = ['trending', 'upcoming', 'top-rated'];

function isValidCategory(category: string): category is AnimeCategory {
    return VALID_CATEGORIES.includes(category as AnimeCategory);
}

const categoryTitles: Record<AnimeCategory, string> = {
    'trending': 'Trending Anime',
    'upcoming': 'Upcoming Anime',
    'top-rated': 'Top Rated Anime',
};

const categoryDescriptions: Record<AnimeCategory, string> = {
    'trending': 'Catch the latest buzz in the anime world.',
    'upcoming': 'Get a sneak peek at future hits.',
    'top-rated': 'Discover the all-time fan favorites.',
};


export default async function AnimeCategoryPage({ params, searchParams }: AnimeCategoryPageProps) {
  const { category } = params;

  if (!isValidCategory(category)) {
    notFound();
  }

  const currentPage = Number(searchParams?.page) || 1;
  const { shows, totalPages } = await getAnimeByCategory(category, currentPage);
  
  const pageTitle = categoryTitles[category];
  const pageDescription = categoryDescriptions[category];

  return (
    <PageContainer>
      <SectionTitle>{pageTitle}</SectionTitle>
      <p className="mb-8 text-muted-foreground">{pageDescription}</p>
      {shows.length > 0 ? (
        <>
          <MovieGrid items={shows as TVShow[]} />
          <PaginationControls
            totalPages={totalPages}
            currentPage={currentPage}
            basePath={`/anime/${category}`}
          />
        </>
      ) : (
        <p className="text-muted-foreground">No anime found in the {category} category yet. Check back soon!</p>
      )}
    </PageContainer>
  );
}
