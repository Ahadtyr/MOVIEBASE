
import PageContainer from '@/components/shared/PageContainer';
import SectionTitle from '@/components/shared/SectionTitle';
import MovieGrid from '@/components/movie/MovieGrid';
import PaginationControls from '@/components/shared/PaginationControls';
import { getDiscoverMoviesByParams, getDiscoverTVShowsByParams } from '@/lib/tmdb';
import { notFound } from 'next/navigation';
import { capitalize } from '@/lib/utils';
import type { Movie, TVShow } from '@/lib/types';

interface ServicePageProps {
  params: { service: string; type: 'movies' | 'tv' };
  searchParams?: { page?: string };
}

const SERVICE_CONFIG = {
  netflix: { name: 'Netflix', movieProviderId: '8', tvNetworkId: '213' },
  prime: { name: 'Prime Video', movieProviderId: '9', tvNetworkId: '1024' },
  apple: { name: 'Apple TV+', movieProviderId: '350', tvNetworkId: '2552' },
  disney: { name: 'Disney+', movieProviderId: '337', tvNetworkId: '2739' },
  hbo: { name: 'HBO Max', movieProviderId: '384', tvNetworkId: '3186' },
  peacock: { name: 'Peacock', movieProviderId: '386', tvNetworkId: '3353' },
};

export default async function ServicePage({ params, searchParams }: ServicePageProps) {
  const { service, type } = params;
  const serviceKey = service as keyof typeof SERVICE_CONFIG;
  const config = SERVICE_CONFIG[serviceKey];

  if (!config || (type !== 'movies' && type !== 'tv')) {
    notFound();
  }

  const currentPage = Number(searchParams?.page) || 1;
  let items: (Movie | TVShow)[] = [];
  let totalPages = 0;

  if (type === 'movies') {
    const { movies, totalPages: pages } = await getDiscoverMoviesByParams(
      { with_watch_providers: config.movieProviderId, watch_region: 'US' },
      currentPage
    );
    items = movies;
    totalPages = pages;
  } else {
    const { shows, totalPages: pages } = await getDiscoverTVShowsByParams(
      { with_networks: config.tvNetworkId },
      currentPage
    );
    items = shows;
    totalPages = pages;
  }

  const pageTitle = `${config.name} ${capitalize(type)}`;
  const pageDescription = `Explore the latest and greatest ${type} from ${config.name}.`;

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
            basePath={`/service/${service}/${type}`}
          />
        </>
      ) : (
        <p className="text-muted-foreground">No {type} found for {config.name}. Check back soon!</p>
      )}
    </PageContainer>
  );
}
