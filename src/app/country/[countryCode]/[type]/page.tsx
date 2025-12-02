
import PageContainer from '@/components/shared/PageContainer';
import SectionTitle from '@/components/shared/SectionTitle';
import MovieGrid from '@/components/movie/MovieGrid';
import PaginationControls from '@/components/shared/PaginationControls';
import { getDiscoverMoviesByParams, getDiscoverTVShowsByParams } from '@/lib/tmdb';
import { notFound } from 'next/navigation';
import { capitalize } from '@/lib/utils';
import type { Movie, TVShow } from '@/lib/types';
import { COUNTRIES } from '@/lib/countries';

interface CountryPageProps {
  params: { countryCode: string; type: 'movies' | 'tv' };
  searchParams?: { page?: string };
}

export default async function CountryPage({ params, searchParams }: CountryPageProps) {
  const { countryCode, type } = params;
  
  const country = COUNTRIES.find(c => c.iso_3166_1 === countryCode);

  if (!country || (type !== 'movies' && type !== 'tv')) {
    notFound();
  }

  const currentPage = Number(searchParams?.page) || 1;
  let items: (Movie | TVShow)[] = [];
  let totalPages = 0;

  if (type === 'movies') {
    const { movies, totalPages: pages } = await getDiscoverMoviesByParams(
      { with_origin_country: countryCode, sort_by: 'popularity.desc' },
      currentPage
    );
    items = movies;
    totalPages = pages;
  } else {
    const { shows, totalPages: pages } = await getDiscoverTVShowsByParams(
      { with_origin_country: countryCode, sort_by: 'popularity.desc' },
      currentPage
    );
    items = shows;
    totalPages = pages;
  }

  const pageTitle = `Trending in ${country.english_name}`;
  const pageDescription = `Explore the most popular ${type} from ${country.english_name}.`;

  return (
    <PageContainer>
      <SectionTitle>{pageTitle}</SectionTitle>
      <p className="mb-8 text-muted-foreground">{pageDescription}</p>
      {items.length > 0 ? (
        <>
          <MovieGrid items={items} />
          <PaginationControls
            totalPages={totalPages}
            currentPage={currentPage}
            basePath={`/country/${countryCode}/${type}`}
          />
        </>
      ) : (
        <p className="text-muted-foreground">No {type} found for {country.english_name}. Check back soon!</p>
      )}
    </PageContainer>
  );
}
