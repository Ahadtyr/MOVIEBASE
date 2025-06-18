'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Movie, TVShow } from '@/lib/types'; // TVShow is placeholder type
import { Star, PlayCircle, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { IMAGE_BASE_URL_W500 } from '@/lib/tmdb';

interface MovieCardProps {
  item: Movie | TVShow; // Movie is TMDb type, TVShow is placeholder
  className?: string;
}

export default function MovieCard({ item, className }: MovieCardProps) {
  // Check if item is a TMDb Movie object (has vote_average) or a placeholder TVShow
  const isTMDbMovie = 'vote_average' in item && typeof item.id === 'number';
  const href = isTMDbMovie ? `/movie/${item.id}` : `/tv-show/${item.id}`;

  const title = item.title;
  const posterPath = isTMDbMovie ? (item as Movie).poster_path : (item as TVShow).posterUrl;
  const posterUrl = isTMDbMovie 
    ? posterPath ? `${IMAGE_BASE_URL_W500}${posterPath}` : 'https://placehold.co/400x600.png'
    : posterPath; // Placeholder TVShow already has full URL

  const rating = isTMDbMovie ? (item as Movie).vote_average : (item as TVShow).rating;
  const releaseDate = item.release_date || (item as TVShow).releaseDate;
  const synopsis = isTMDbMovie ? (item as Movie).overview : (item as TVShow).synopsis;
  
  let genresDisplay: { id: string | number; name: string }[] = [];
  if (isTMDbMovie) {
    genresDisplay = (item as Movie).genres.map(g => ({ id: g.id, name: g.name }));
  } else if ((item as TVShow).genres) {
    genresDisplay = (item as TVShow).genres.map((g, idx) => ({ id: `genre-${idx}`, name: g }));
  }


  return (
    <Link href={href} className={cn("group relative block overflow-hidden rounded-lg shadow-lg aspect-[2/3] transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-accent/30 hover:scale-105", className)} data-ai-hint="movie poster">
      <Image
        src={posterUrl}
        alt={title}
        width={400}
        height={600}
        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
        <h3 className="text-lg font-headline font-semibold text-primary-foreground mb-1 line-clamp-2">{title}</h3>
        <div className="flex items-center text-xs text-muted-foreground mb-2">
          <Star className="w-4 h-4 text-yellow-400 mr-1" />
          <span>{rating.toFixed(1)}</span>
          {releaseDate && <span className="mx-2">|</span>}
          {releaseDate && <span>{new Date(releaseDate).getFullYear()}</span>}
          {!isTMDbMovie && (item as TVShow).seasons && (
            <>
              <span className="mx-2">|</span>
              <span>{(item as TVShow).seasons} Season{((item as TVShow).seasons ?? 0) > 1 ? 's' : ''}</span>
            </>
          )}
        </div>
        <div className="flex space-x-2 mb-2">
          {genresDisplay.slice(0, 2).map((genre) => (
            <Badge key={genre.id} variant="secondary" className="text-xs bg-primary/70 text-primary-foreground backdrop-blur-sm">
              {genre.name}
            </Badge>
          ))}
        </div>
        
        <p className="text-xs text-foreground/80 line-clamp-2 mb-3">{synopsis}</p>

        <div className="flex items-center space-x-2">
            <button 
              aria-label="Play trailer"
              className="p-2 rounded-full bg-accent/80 hover:bg-accent text-accent-foreground transition-colors"
              onClick={(e) => { e.preventDefault(); alert(`Playing trailer for ${title}`); }}
            >
              <PlayCircle className="w-5 h-5" />
            </button>
            <button 
              aria-label="More info"
              className="p-2 rounded-full bg-secondary/80 hover:bg-secondary text-secondary-foreground transition-colors"
            >
              <Info className="w-5 h-5" />
            </button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent group-hover:opacity-0 transition-opacity duration-300">
        <h3 className="text-md font-semibold text-primary-foreground truncate">{title}</h3>
      </div>
    </Link>
  );
}
