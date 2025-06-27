import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationControlsProps {
  totalPages: number;
  currentPage: number;
  basePath: string;
}

export default function PaginationControls({ totalPages, currentPage, basePath }: PaginationControlsProps) {
  if (totalPages <= 1) return null;

  const generatePageNumbers = () => {
    const pages = new Set<number>();
    
    // Always add first and last page
    pages.add(1);
    pages.add(totalPages);
    
    // Add pages around current page
    for (let i = -1; i <= 1; i++) {
      const page = currentPage + i;
      if (page > 1 && page < totalPages) {
        pages.add(page);
      }
    }
    
    const sortedPages = Array.from(pages).sort((a, b) => a - b);
    
    const finalPages: (number | string)[] = [];
    let lastPage = 0;
    for (const page of sortedPages) {
      if (lastPage !== 0 && page > lastPage + 1) {
        finalPages.push('...');
      }
      finalPages.push(page);
      lastPage = page;
    }
    
    return finalPages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="flex items-center justify-center space-x-1 sm:space-x-2 py-8">
      {currentPage > 1 && (
        <Link href={`${basePath}?page=${currentPage - 1}`} passHref>
          <Button variant="outline" size="icon" aria-label="Go to previous page">
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </Link>
      )}
      
      {pageNumbers.map((page, index) =>
        typeof page === 'number' ? (
          <Link href={`${basePath}?page=${page}`} key={page} passHref>
            <Button variant={currentPage === page ? 'default' : 'outline'} size="icon">
              {page}
            </Button>
          </Link>
        ) : (
          <span key={`ellipsis-${index}`} className="flex h-10 w-10 items-center justify-center text-muted-foreground">...</span>
        )
      )}

      {currentPage < totalPages && (
        <Link href={`${basePath}?page=${currentPage + 1}`} passHref>
          <Button variant="outline" size="icon" aria-label="Go to next page">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      )}
    </div>
  );
}
