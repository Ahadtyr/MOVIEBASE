'use client';

import { useState, useEffect } from 'react';
import SearchBar from '@/components/search/SearchBar';
import MovieCard from '@/components/movie/MovieCard';
import PageContainer from '@/components/shared/PageContainer';
import SectionTitle from '@/components/shared/SectionTitle';
import { allContent as initialAllContent } from '@/lib/placeholder-data';
import type { Movie, TVShow } from '@/lib/types';

export default function SearchPage() {
  const [searchResults, setSearchResults] = useState<(Movie | TVShow)[]>(initialAllContent);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial loading
  useEffect(() => {
    setSearchResults(initialAllContent);
    setIsLoading(false);
  }, []);

  const handleSearchResults = (results: (Movie | TVShow)[]) => {
    setSearchResults(results);
  };

  return (
    <PageContainer>
      <SectionTitle className="text-center mb-8">Search MOVIEBASE</SectionTitle>
      <SearchBar initialItems={initialAllContent} onSearch={handleSearchResults} />

      {isLoading ? (
        <div className="text-center py-10 text-muted-foreground">Loading content...</div>
      ) : searchResults.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 mt-12">
          {searchResults.map(item => (
            <MovieCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl text-muted-foreground">No results found.</p>
          <p className="text-sm text-muted-foreground">Try a different search term.</p>
        </div>
      )}
    </PageContainer>
  );
}
