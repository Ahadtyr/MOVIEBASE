import Image from 'next/image';
import type { Movie, TVShow } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Star, CalendarDays, Clock, Tv } from 'lucide-react';
import { IMAGE_BASE_URL_ORIGINAL, IMAGE_BASE_URL_W500 } from '@/lib/tmdb';

interface MovieDetailsBannerProps {
  item: Movie | TVShow;
}

export default function MovieDetailsBanner({ item }: MovieDetailsBannerProps) {
  const isMovie = 'vote_average' in item;

  const title = item.title;
  const rating = isMovie ? (item as Movie).vote_average : (item as TVShow).rating;
  const releaseDate = isMovie ? (item as Movie).release_date : (item as TVShow).releaseDate;
  
  const getImageUrl = (path: string | null | undefined, baseUrl: string) => {
    if (!path) return 'https://placehold.co/1200x675.png';
    if (path.startsWith('http')) return path;
    return `${baseUrl}${path}`;
  };

  const bannerUrl = getImageUrl(
    isMovie ? (item as Movie).backdrop_path : (item as TVShow).bannerUrl,
    IMAGE_BASE_URL_ORIGINAL
  );
  
  const posterUrl = getImageUrl(
    isMovie ? (item as Movie).poster_path : (item as TVShow).posterUrl,
    IMAGE_BASE_URL_W500
  );

  const genresDisplay = isMovie 
    ? (item as Movie).genres.map(g => ({ id: g.id, name: g.name }))
    : (item as TVShow).genres.map((g, idx) => ({ id: `genre-${idx}`, name: g }));
  
  const runtime = isMovie ? (item as Movie).runtime : undefined;
  const tvShowDetails = !isMovie ? (item as TVShow) : undefined;

  return (
    <div className="relative h-[60vh] md:h-[70vh] w-full text-primary-foreground">
      <Image
        src={bannerUrl}
        alt={`Banner for ${title}`}
        fill
        style={{objectFit: "cover"}}
        priority
        data-ai-hint="movie scene action"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
      <div className="absolute inset-0 flex items-end p-6 md:p-12">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-end">
            <div className="md:col-span-1 hidden md:block relative aspect-[2/3] w-full max-w-xs rounded-lg overflow-hidden shadow-2xl -mb-16 transform translate-y-1/4">
               <Image
                src={posterUrl}
                alt={`Poster for ${title}`}
                fill
                style={{objectFit: "cover"}}
                data-ai-hint="movie poster portrait"
              />
            </div>
            <div className="md:col-span-2">
              <h1 className="text-4xl md:text-5xl font-headline font-bold mb-3 drop-shadow-xl">{title}</h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 mr-1.5 neon-glow" />
                  <span className="text-lg font-medium">{rating.toFixed(1)}</span>
                </div>
                {releaseDate && (
                  <div className="flex items-center">
                    <CalendarDays className="w-5 h-5 text-muted-foreground mr-1.5" />
                    <span className="text-lg">{new Date(releaseDate).getFullYear()}</span>
                  </div>
                )}
                {isMovie && runtime && (
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-muted-foreground mr-1.5" />
                    <span className="text-lg">{Math.floor(runtime / 60)}h {runtime % 60}m</span>
                  </div>
                )}
                {!isMovie && tvShowDetails?.seasons && (
                  <div className="flex items-center">
                    <Tv className="w-5 h-5 text-muted-foreground mr-1.5" />
                    <span className="text-lg">{tvShowDetails.seasons} Season{(tvShowDetails.seasons ?? 0) > 1 ? 's' : ''}</span>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {genresDisplay.map((genre) => (
                  <Badge key={genre.id} variant="secondary" className="bg-primary/80 text-primary-foreground backdrop-blur-sm text-sm px-3 py-1">
                    {genre.name}
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
