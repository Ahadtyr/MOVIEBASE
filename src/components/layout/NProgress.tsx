'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import PageContainer from '../shared/PageContainer';
import MovieGridSkeleton from '../movie/MovieGridSkeleton';
import { Skeleton } from '../ui/skeleton';

function NProgressContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    setKey(prev => prev + 1); // Force re-render to restart animation
    
    // Use a short timer to avoid flicker on very fast page loads
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // This duration can be adjusted

    return () => {
        clearTimeout(timer);
        setIsLoading(false);
    }
  }, [pathname, searchParams]);

  if (!isLoading) {
    return null;
  }

  return (
    <div key={key} className="fixed inset-0 z-[100] bg-background animate-fade-in" style={{animationDuration: '0.2s'}}>
      <PageContainer>
        <Skeleton className="h-10 w-1/4 mb-8" />
        <MovieGridSkeleton count={12} />
      </PageContainer>
    </div>
  );
}


export default function NProgress() {
    return (
        <Suspense fallback={null}>
            <NProgressContent />
        </Suspense>
    )
}
