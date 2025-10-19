import PageContainer from '@/components/shared/PageContainer';
import SectionTitle from '@/components/shared/SectionTitle';
import MovieSection from '@/components/movie/MovieSection';
import { getPopularTVShows, getDiscoverTVShowsByParams } from '@/lib/tmdb';
import type { TVShow } from '@/lib/types';

async function getTVShowsPageData() {
  try {
    const [
      popularShows,
      hindiShows,
      koreanShows,
      westernShows
    ] = await Promise.all([
      getPopularTVShows(),
      getDiscoverTVShowsByParams({ with_original_language: 'hi' }),
      getDiscoverTVShowsByParams({ with_origin_country: 'KR' }),
      getDiscoverTVShowsByParams({ with_origin_country: 'US' })
    ]);
    
    return { 
      popularShows: popularShows.slice(0, 12),
      hindiShows: hindiShows.slice(0, 12),
      koreanShows: koreanShows.slice(0, 12),
      westernShows: westernShows.slice(0, 12),
    };
  } catch (error) {
    console.error("Failed to fetch TV shows page data:", error);
    // Gracefully return empty arrays if there's an error (e.g., missing API key)
    return { popularShows: [], hindiShows: [], koreanShows: [], westernShows: [] };
  }
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
        <MovieSection title="Hindi Series" items={hindiShows} />
      )}

      {koreanShows.length > 0 && (
        <MovieSection title="Korean Dramas" items={koreanShows} />
      )}

      {westernShows.length > 0 && (
        <MovieSection title="Western Shows" items={westernShows} />
      )}

      {(popularShows.length === 0 && hindiShows.length === 0 && koreanShows.length === 0 && westernShows.length === 0) && (
        <p className="text-muted-foreground text-center py-10">
          Could not load TV shows at the moment. Please ensure your TMDb API key is correct or try again later.
        </p>
      )}
    </PageContainer>
  );
}
