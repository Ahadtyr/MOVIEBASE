import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export default function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div className={cn('container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8', className)}>
      {children}
    </div>
  );
}
