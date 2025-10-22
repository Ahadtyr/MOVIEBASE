
import PageContainer from '@/components/shared/PageContainer';
import SectionTitle from '@/components/shared/SectionTitle';
import MovieSection from '@/components/movie/MovieSection';
import { getPopularTVShows, getDiscoverTVShowsByParams } from '@/lib/tmdb';
import type { TVShow } from '@/lib/types';

async function getTVShowsPageData() {
  const [
    popularShows,
    hindiShows,
    koreanShows,
    westernShows
  ] = await Promise.all([
    getPopularTVShows(),
    getDiscoverTVShowsByParams({ with_original_language: 'hi', sort_by: 'first_air_date.desc' }),
    getDiscoverTVShowsByParams({ with_origin_country: 'KR' }),
    getDiscoverTVShowsByParams({ with_origin_country: 'US', sort_by: 'first_air_date.desc' })
  ]);
  
  return { 
    popularShows: popularShows.slice(0, 12),
    hindiShows: hindiShows.slice(0, 12),
    koreanShows: koreanShows.slice(0, 12),
    westernShows: westernShows.slice(0, 12),
  };
}

export default async function TVShowsPage() {
  const { popularShows, hindiShows, koreanShows, westernShows } = await getTVShowsPageData();

  return (
    <PageContainer>
      <SectionTitle>Browse TV Shows</SectionTitle>
      <p className="mb-8 text-muted-foreground">Explore binge-worthy TV series from around the world.</p>
      
      {popularShows.length > 0 && (
        <MovieSection title="Popular TV Shows" items={popularShows} />
      )}
      
      {hindiShows.length > 0 && (
        <MovieSection title="Latest Hindi Series" items={hindiShows} />
      )}

      {koreanShows.length > 0 && (
        <MovieSection title="Korean Dramas" items={koreanShows} />
      )}

      {westernShows.length > 0 && (
        <MovieSection title="Latest Western Shows" items={westernShows} />
      )}

      {(popularShows.length === 0 && hindiShows.length === 0 && koreanShows.length === 0 && westernShows.length === 0) && (
        <p className="text-muted-foreground text-center py-10">
          Could not load TV shows at the moment. Please ensure your TMDb API key is correct or try again later.
        </p>
      )}
    </PageContainer>
  );
}
