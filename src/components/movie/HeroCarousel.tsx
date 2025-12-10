
'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Movie, TVShow } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, PlayCircle, Info, Star, CalendarDays, Film, Tv } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { IMAGE_BASE_URL_ORIGINAL } from '@/lib/tmdb';

interface HeroCarouselProps {
  items: (Movie | TVShow)[];
}

export default function HeroCarousel({ items }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = useCallback(() => {
    if (items.length === 0) return;
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? items.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, items.length]);

  const goToNext = useCallback(() => {
    if (items.length === 0) return;
    const isLastSlide = currentIndex === items.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, items.length]);

  useEffect(() => {
    if (items.length <= 1) return;
    const timer = setTimeout(goToNext, 7000); // Auto-rotate every 7 seconds
    return () => clearTimeout(timer);
  }, [currentIndex, goToNext, items.length]);

  if (!items || items.length === 0) {
    return (
      <div className="h-[85vh] flex items-center justify-center bg-muted">
        <p className="text-muted-foreground">No featured content available at the moment.</p>
      </div>
    );
  }

  const getBannerUrl = (item: Movie | TVShow) => {
    if (item.backdrop_path) {
      return `${IMAGE_BASE_URL_ORIGINAL}${item.backdrop_path}`;
    }
    return `https://placehold.co/1920x1080.png`;
  };
  
  const currentItem = items[currentIndex];
  const isTV = 'name' in currentItem;
  const title = isTV ? currentItem.name : currentItem.title;
  const releaseDate = isTV ? currentItem.first_air_date : currentItem.release_date;
  const playerHref = isTV ? `/player/tv/${currentItem.id}?s=1&e=1` : `/player/movie/${currentItem.id}`;
  const detailsHref = isTV ? `/tv-show/${currentItem.id}` : `/movie/${currentItem.id}`;

  return (
    <div className="relative w-full h-[85vh] max-h-[1080px] overflow-hidden group" role="region" aria-roledescription="carousel" aria-label="Featured Movies">
      {items.map((item, index) => (
        <div
          key={item.id}
          className={cn(
            "absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out",
            index === currentIndex ? "opacity-100 z-0" : "opacity-0 -z-10"
          )}
        >
          <Image
            src={getBannerUrl(item)}
            alt={`Banner for ${'name' in item ? item.name : item.title}`}
            fill
            style={{ objectFit: 'cover' }}
            priority={index === 0}
            data-ai-hint="movie scene landscape"
          />
       </div>
      ))}
      
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />

      <div className="relative z-10 h-full flex flex-col justify-end items-start p-6 md:p-12 lg:p-16 text-primary-foreground">
        <div className="max-w-3xl animate-slide-up" style={{ animationDelay: '0.2s' }}>
           {currentItem.logo_path ? (
              <Image
                src={currentItem.logo_path}
                alt={`${title} logo`}
                width={400}
                height={200}
                className="max-h-[60px] md:max-h-[100px] w-auto object-contain object-left drop-shadow-xl mb-4 animate-fade-in"
                style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))', animationDelay: '0.5s' }}
              />
            ) : (
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-headline font-bold mb-3 drop-shadow-xl animate-fade-in" style={{ animationDelay: '0.5s' }}>{title}</h1>
            )}
           <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 mr-1.5 neon-glow" />
                  <span className="text-base font-medium">{currentItem.vote_average.toFixed(1)}</span>
                </div>
                {releaseDate && (
                  <div className="flex items-center">
                    <CalendarDays className="w-5 h-5 text-muted-foreground mr-1.5" />
                    <span className="text-base">{new Date(releaseDate).getFullYear()}</span>
                  </div>
                )}
                <div className="flex items-center">
                    {isTV ? <Tv className="w-5 h-5 text-muted-foreground mr-1.5" /> : <Film className="w-5 h-5 text-muted-foreground mr-1.5" />}
                    <span className="text-base">{isTV ? 'TV Show' : 'Movie'}</span>
                </div>
            </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {currentItem.genres?.slice(0, 3).map(genre => (
              <Badge key={genre.id} variant="secondary" className="bg-white/20 text-white backdrop-blur-sm text-sm px-3 py-1 border border-white/30">
                {genre.name}
              </Badge>
            ))}
          </div>
          <p className="text-sm md:text-base text-white/90 leading-relaxed line-clamp-3 mb-6 drop-shadow-md">
            {currentItem.overview}
          </p>
          <div className="flex space-x-3">
            <Link href={playerHref} passHref>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg py-6 px-8">
                <PlayCircle className="mr-2 h-6 w-6 neon-glow" /> Watch Now
              </Button>
            </Link>
            <Link href={detailsHref} passHref>
              <Button size="lg" variant="secondary" className="bg-white/20 hover:bg-white/30 text-white font-semibold backdrop-blur-sm text-lg py-6 px-8">
                 <Info className="mr-2 h-6 w-6" /> More Info
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {items.length > 1 && (
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
            {items.map((_, index) => (
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
