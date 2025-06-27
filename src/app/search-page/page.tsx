'use client';

import { useState } from 'react';
import SearchBar from '@/components/search/SearchBar';
import MovieCard from '@/components/movie/MovieCard';
import PageContainer from '@/components/shared/PageContainer';
import SectionTitle from '@/components/shared/SectionTitle';
import type { Movie, TVShow } from '@/lib/types';
import { Loader2 } from 'lucide-react';

export default function SearchPage() {
  const [searchResults, setSearchResults] = useState<(Movie | TVShow)[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearchResults = (results: (Movie | TVShow)[]) => {
    setSearchResults(results);
    if (!hasSearched) {
      setHasSearched(true);
    }
  };

  return (
    <PageContainer>
      <SectionTitle className="text-center mb-8">Search MOVIEBASE</SectionTitle>
      <SearchBar onSearch={handleSearchResults} onLoading={setIsLoading} />

      {isLoading ? (
        <div className="text-center py-10 text-muted-foreground flex justify-center items-center gap-2 mt-12">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Searching...</span>
        </div>
      ) : searchResults.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 mt-12">
          {searchResults.map(item => (
            <MovieCard key={`${item.id}-${'name' in item ? 'tv' : 'movie'}`} item={item} />
          ))}
        </div>
      ) : hasSearched ? (
        <div className="text-center py-10 mt-12">
          <p className="text-xl text-muted-foreground">No results found.</p>
          <p className="text-sm text-muted-foreground">Try a different search term.</p>
        </div>
      ) : (
         <div className="text-center py-10 mt-12">
          <p className="text-xl text-muted-foreground">Find your next favorite movie or TV show.</p>
          <p className="text-sm text-muted-foreground">Start typing in the search bar above.</p>
        </div>
      )}
    </PageContainer>
  );
}
