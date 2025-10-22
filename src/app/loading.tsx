import PageContainer from '@/components/shared/PageContainer';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

export default function Loading() {
  return (
    <PageContainer className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <LoadingSpinner />
    </PageContainer>
  );
}
