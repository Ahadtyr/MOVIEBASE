import Image from 'next/image';
import type { Movie, TVShow } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Star, CalendarDays, Clock, Tv } from 'lucide-react';

interface MovieDetailsBannerProps {
  item: Movie | TVShow;
}

export default function MovieDetailsBanner({ item }: MovieDetailsBannerProps) {
  const isMovie = 'duration' in item;

  return (
    <div className="relative h-[60vh] md:h-[70vh] w-full text-primary-foreground">
      <Image
        src={item.bannerUrl}
        alt={`Banner for ${item.title}`}
        layout="fill"
        objectFit="cover"
        priority
        data-ai-hint="movie scene action"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
      <div className="absolute inset-0 flex items-end p-6 md:p-12">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-end">
            <div className="md:col-span-1 hidden md:block relative aspect-[2/3] w-full max-w-xs rounded-lg overflow-hidden shadow-2xl -mb-16 transform translate-y-1/4">
               <Image
                src={item.posterUrl}
                alt={`Poster for ${item.title}`}
                layout="fill"
                objectFit="cover"
                data-ai-hint="movie poster portrait"
              />
            </div>
            <div className="md:col-span-2">
              <h1 className="text-4xl md:text-5xl font-headline font-bold mb-3 drop-shadow-xl">{item.title}</h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 mr-1.5 neon-glow" />
                  <span className="text-lg font-medium">{item.rating.toFixed(1)}</span>
                </div>
                <div className="flex items-center">
                  <CalendarDays className="w-5 h-5 text-muted-foreground mr-1.5" />
                  <span className="text-lg">{new Date(item.releaseDate).getFullYear()}</span>
                </div>
                {isMovie && (item as Movie).duration && (
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-muted-foreground mr-1.5" />
                    <span className="text-lg">{(item as Movie).duration}</span>
                  </div>
                )}
                {!isMovie && (item as TVShow).seasons && (
                  <div className="flex items-center">
                    <Tv className="w-5 h-5 text-muted-foreground mr-1.5" />
                    <span className="text-lg">{(item as TVShow).seasons} Season{((item as TVShow).seasons ?? 0) > 1 ? 's' : ''}</span>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {item.genres.map((genre) => (
                  <Badge key={genre} variant="secondary" className="bg-primary/80 text-primary-foreground backdrop-blur-sm text-sm px-3 py-1">
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
