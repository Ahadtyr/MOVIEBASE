'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Search, X, Loader2 } from 'lucide-react';
import type { Movie, TVShow } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../ui/button';
import { IMAGE_BASE_URL_W500 } from '@/lib/tmdb';
import { searchContent } from '@/app/actions/search';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  onSearch: (results: (Movie | TVShow)[]) => void;
  onLoading: (loading: boolean) => void;
}

export default function SearchBar({ onSearch, onLoading }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<(Movie | TVShow)[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const performSearch = useCallback(async (term: string) => {
    if (term.length > 1) {
      setIsLoading(true);
      onLoading(true);
      const results = await searchContent(term);
      onSearch(results);
      setSuggestions(results.slice(0, 5)); // Show top 5 suggestions
      setIsLoading(false);
      onLoading(false);
    } else {
      onSearch([]); // Clear results
      setSuggestions([]);
    }
  }, [onSearch, onLoading]);

  useEffect(() => {
    const handler = setTimeout(() => {
      performSearch(searchTerm);
    }, 300); // 300ms debounce

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, performSearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const posterUrl = (item: Movie | TVShow) => {
    return item.poster_path
      ? `${IMAGE_BASE_URL_W500}${item.poster_path}`
      : 'https://placehold.co/40x60.png';
  }
  
  const handleClear = () => {
    setSearchTerm('');
    onSearch([]);
    setSuggestions([]);
  }

  return (
    <div className="relative w-full max-w-xl mx-auto" ref={searchContainerRef}>
      <div className="relative">
        <Input
          type="search"
          placeholder="Search for movies, TV shows..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          className="pl-10 pr-10 py-3 text-lg rounded-full border-2 border-primary/50 focus:border-primary focus:ring-primary"
          aria-label="Search content"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        
        {isLoading ? (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground animate-spin" />
        ) : searchTerm && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-3 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground hover:text-primary"
            onClick={handleClear}
            aria-label="Clear search"
          >
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      {isFocused && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-card border border-border rounded-lg shadow-xl overflow-hidden animate-fade-in max-h-96 overflow-y-auto">
          {suggestions.map(item => {
            const isMovie = 'title' in item && !('name' in item);
            const href = isMovie ? `/movie/${item.id}` : `/tv-show/${item.id}`;
            const title = isMovie ? item.title : (item as TVShow).name;
            const date = isMovie ? (item as Movie).release_date : (item as TVShow).first_air_date;
            const firstGenre = item.genres[0]?.name;

            return (
              <li key={`${item.id}-${isMovie ? 'movie' : 'tv'}`}>
                <Link
                  href={href}
                  className="flex items-center p-3 hover:bg-accent/10 transition-colors"
                  onClick={() => setIsFocused(false)}
                >
                  <Image
                    src={posterUrl(item)}
                    alt={title}
                    width={40}
                    height={60}
                    className="w-10 h-15 object-cover rounded-sm mr-3 bg-muted"
                    data-ai-hint="movie poster small"
                  />
                  <div className="flex-grow">
                    <p className="font-medium text-sm text-card-foreground">{title}</p>
                    <p className="text-xs text-muted-foreground">
                      {date ? new Date(date).getFullYear() : 'N/A'}
                      {firstGenre ? ` • ${firstGenre}` : ''}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
