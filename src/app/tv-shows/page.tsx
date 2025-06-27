import PageContainer from '@/components/shared/PageContainer';
import SectionTitle from '@/components/shared/SectionTitle';
import MovieSection from '@/components/movie/MovieSection';
import { getPopularTVShows } from '@/lib/tmdb';
import type { TVShow } from '@/lib/types';

async function getTVShowsPageData() {
  try {
    const popularShows = await getPopularTVShows();
    return { shows: popularShows };
  } catch (error) {
    console.error("Failed to fetch TV shows page data:", error);
    return { shows: [] };
  }
}

export default async function TVShowsPage() {
  const { shows } = await getTVShowsPageData();

  return (
    <PageContainer>
      <SectionTitle>Popular TV Shows</SectionTitle>
      <p className="mb-8 text-muted-foreground">Explore binge-worthy TV series, from classic sitcoms to epic dramas.</p>
       {shows.length > 0 ? (
        <MovieSection title="" items={shows} />
      ) : (
        <p className="text-muted-foreground text-center py-10">
          Could not load TV shows at the moment. Please ensure your TMDb API key is correct or try again later.
        </p>
      )}
    </PageContainer>
  );
}
