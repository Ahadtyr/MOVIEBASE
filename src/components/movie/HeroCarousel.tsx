'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Movie } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, PlayCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface HeroCarouselProps {
  movies: Movie[];
}

export default function HeroCarousel({ movies }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = useCallback(() => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? movies.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, movies.length]);

  const goToNext = useCallback(() => {
    const isLastSlide = currentIndex === movies.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, movies.length]);

  useEffect(() => {
    if (movies.length <= 1) return;
    const timer = setTimeout(goToNext, 7000); // Auto-rotate every 7 seconds
    return () => clearTimeout(timer);
  }, [currentIndex, goToNext, movies.length]);

  if (!movies || movies.length === 0) {
    return (
      <div className="h-[70vh] flex items-center justify-center bg-muted">
        <p className="text-muted-foreground">No movies to display in carousel.</p>
      </div>
    );
  }

  const currentMovie = movies[currentIndex];

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] md:h-[calc(85vh-4rem)] max-h-[700px] overflow-hidden group" role="region" aria-roledescription="carousel" aria-label="Featured Movies">
      <div className="absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out" key={currentMovie.id}>
        <Image
          src={currentMovie.bannerUrl}
          alt={`Banner for ${currentMovie.title}`}
          layout="fill"
          objectFit="cover"
          priority={currentIndex === 0}
          data-ai-hint="movie scene landscape"
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>

      <div className="relative z-10 h-full flex flex-col justify-end items-start p-6 md:p-12 lg:p-16 text-primary-foreground">
        <div className="max-w-2xl animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold mb-4 drop-shadow-lg">
            {currentMovie.title}
          </h1>
          <div className="flex items-center space-x-4 mb-4">
            {currentMovie.genres.slice(0, 3).map(genre => (
              <Badge key={genre} variant="outline" className="border-primary-foreground/50 text-primary-foreground bg-black/30 backdrop-blur-sm text-sm">
                {genre}
              </Badge>
            ))}
          </div>
          <p className="text-base md:text-lg mb-6 line-clamp-3 drop-shadow-sm">
            {currentMovie.synopsis}
          </p>
          <div className="flex space-x-3">
            <Link href={`/movie/${currentMovie.id}`} passHref>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                <PlayCircle className="mr-2 h-5 w-5 neon-glow" /> Watch Now
              </Button>
            </Link>
            <Link href={`/movie/${currentMovie.id}#details`} passHref>
              <Button size="lg" variant="secondary" className="bg-secondary/70 hover:bg-secondary/90 text-secondary-foreground font-semibold backdrop-blur-sm">
                More Info
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {movies.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrevious}
            className="absolute top-1/2 left-4 -translate-y-1/2 z-20 bg-black/30 hover:bg-primary text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="Previous movie"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={goToNext}
            className="absolute top-1/2 right-4 -translate-y-1/2 z-20 bg-black/30 hover:bg-primary text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="Next movie"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
            {movies.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "h-2 w-2 rounded-full transition-all duration-300",
                  currentIndex === index ? "bg-primary w-6" : "bg-primary-foreground/50 hover:bg-primary-foreground/80"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
