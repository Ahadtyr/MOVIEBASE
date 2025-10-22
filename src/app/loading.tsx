import PageContainer from '@/components/shared/PageContainer';
import MovieGridSkeleton from '@/components/movie/MovieGridSkeleton';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <PageContainer>
      <Skeleton className="h-10 w-1/4 mb-8" />
      <MovieGridSkeleton count={12} />
    </PageContainer>
  );
}
