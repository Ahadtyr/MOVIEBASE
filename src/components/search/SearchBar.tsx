'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import type { Movie, TVShow } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../ui/button';
import { IMAGE_BASE_URL_W500 } from '@/lib/tmdb';

interface SearchBarProps {
  initialItems: (Movie | TVShow)[];
  onSearch: (results: (Movie | TVShow)[]) => void;
}

export default function SearchBar({ initialItems, onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<(Movie | TVShow)[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
    if (term.length > 1) {
      const filtered = initialItems.filter(item =>
        item.title.toLowerCase().includes(term.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5)); // Show top 5 suggestions
      onSearch(filtered); // Update results on parent page
    } else {
      setSuggestions([]);
      onSearch(initialItems); // Show all items if search term is short
    }
  }, [initialItems, onSearch]);

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

  const getSuggestionPosterUrl = (item: Movie | TVShow) => {
    const isMovie = 'poster_path' in item;
    if (isMovie) {
        const path = (item as Movie).poster_path;
        if (path) {
            if (path.startsWith('http')) return path;
            return `${IMAGE_BASE_URL_W500}${path}`;
        }
    } else {
        return (item as TVShow).posterUrl;
    }
    return 'https://placehold.co/40x60.png';
  }

  return (
    <div className="relative w-full max-w-xl mx-auto" ref={searchContainerRef}>
      <div className="relative">
        <Input
          type="search"
          placeholder="Search for movies, TV shows..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
          className="pl-10 pr-10 py-3 text-lg rounded-full border-2 border-primary/50 focus:border-primary focus:ring-primary"
          aria-label="Search content"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        {searchTerm && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-3 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground hover:text-primary"
            onClick={() => handleSearch('')}
            aria-label="Clear search"
          >
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      {isFocused && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-card border border-border rounded-lg shadow-xl overflow-hidden animate-fade-in max-h-96 overflow-y-auto">
          {suggestions.map(item => {
            const isMovie = 'vote_average' in item;
            const href = isMovie ? `/movie/${item.id}` : `/tv-show/${item.id}`;
            const posterUrl = getSuggestionPosterUrl(item);
            const date = isMovie ? (item as Movie).release_date : (item as TVShow).releaseDate;
            const firstGenre = isMovie ? (item as Movie).genres[0]?.name : (item as TVShow).genres[0];

            return (
              <li key={item.id}>
                <Link
                  href={href}
                  className="flex items-center p-3 hover:bg-accent/10 transition-colors"
                  onClick={() => setIsFocused(false)}
                >
                  <Image
                    src={posterUrl}
                    alt={item.title}
                    width={40}
                    height={60}
                    className="w-10 h-15 object-cover rounded-sm mr-3"
                    data-ai-hint="movie poster small"
                  />
                  <div className="flex-grow">
                    <p className="font-medium text-sm text-card-foreground">{item.title}</p>
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
