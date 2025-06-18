import PageContainer from '@/components/shared/PageContainer';
import SectionTitle from '@/components/shared/SectionTitle';
import MovieSection from '@/components/movie/MovieSection';
import { placeholderMovies } from '@/lib/placeholder-data';

export default function MoviesPage() {
  return (
    <PageContainer>
      <SectionTitle>All Movies</SectionTitle>
      <p className="mb-8 text-muted-foreground">Browse our extensive collection of movies across all genres.</p>
      {/* For now, just display all placeholder movies. Pagination/filtering would be added here. */}
      <MovieSection title="" items={placeholderMovies} />
    </PageContainer>
  );
}
