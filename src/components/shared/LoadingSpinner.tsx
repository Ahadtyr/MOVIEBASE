import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  className?: string;
  size?: number; // size is no longer directly used but kept for prop compatibility
}

export default function LoadingSpinner({ className }: LoadingSpinnerProps) {
  return (
    <div className={cn("flex justify-center items-center py-12", className)}>
      <div className="film-reel-loader" aria-label="Loading content...">
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}
