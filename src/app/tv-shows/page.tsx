import PageContainer from '@/components/shared/PageContainer';
import SectionTitle from '@/components/shared/SectionTitle';
import MovieSection from '@/components/movie/MovieSection';
import { placeholderTVShows } from '@/lib/placeholder-data';

export default function TVShowsPage() {
  return (
    <PageContainer>
      <SectionTitle>All TV Shows</SectionTitle>
      <p className="mb-8 text-muted-foreground">Explore binge-worthy TV series, from classic sitcoms to epic dramas.</p>
       {/* For now, just display all placeholder TV shows. Pagination/filtering would be added here. */}
      <MovieSection title="" items={placeholderTVShows} />
    </PageContainer>
  );
}
