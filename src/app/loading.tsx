import PageContainer from '@/components/shared/PageContainer';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <PageContainer className="flex items-center justify-center min-h-[calc(100vh-12rem)]">
        <LoadingSpinner size={64} />
    </PageContainer>
  );
}
