import type { TVSeasonDetails, TVEpisode } from '@/lib/types';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import SectionTitle from '@/components/shared/SectionTitle';
import Link from 'next/link';
import { PlayCircle, Tv } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { IMAGE_BASE_URL_W500 } from '@/lib/tmdb';

interface EpisodeListProps {
  tvShowId: number;
  seasons: TVSeasonDetails[];
  currentSeason: number;
  currentEpisode: number;
}

export default function EpisodeList({ tvShowId, seasons, currentSeason, currentEpisode }: EpisodeListProps) {
  if (!seasons || seasons.length === 0) return null;

  const getImageUrl = (path: string | null) => {
    return path ? `${IMAGE_BASE_URL_W500}${path}` : 'https://placehold.co/154x87.png';
  }

  return (
    <div>
      <SectionTitle>Seasons & Episodes</SectionTitle>
      <Accordion type="single" collapsible defaultValue={`season-${currentSeason}`} className="w-full">
        {seasons.map(season => (
          <AccordionItem value={`season-${season.season_number}`} key={season.id} className="border-border/50">
            <AccordionTrigger className="text-xl font-semibold hover:no-underline text-primary-foreground py-4">
              Season {season.season_number} ({season.episodes.length} episodes)
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-4">
                {season.episodes.map(episode => {
                  const isActive = season.season_number === currentSeason && episode.episode_number === currentEpisode;
                  return (
                    <Link
                      key={episode.id}
                      href={`/player/tv/${tvShowId}?s=${season.season_number}&e=${episode.episode_number}`}
                      className={cn(
                        "flex items-center gap-4 p-3 rounded-lg transition-colors duration-200",
                        isActive ? "bg-primary/20" : "bg-card hover:bg-primary/10"
                      )}
                      scroll={false} // Prevent page from scrolling to top
                    >
                      <div className="text-xl font-bold text-muted-foreground w-8 text-center">{episode.episode_number}</div>
                      <div className="relative w-36 aspect-video rounded-md overflow-hidden flex-shrink-0">
                         <Image 
                           src={getImageUrl(episode.still_path)}
                           alt={`Still from ${episode.name}`}
                           fill
                           style={{objectFit: 'cover'}}
                           data-ai-hint="tv episode still"
                         />
                      </div>
                      <div className="flex-grow">
                        <h4 className={cn("font-semibold", isActive ? "text-accent" : "text-primary-foreground")}>{episode.name}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">{episode.overview}</p>
                      </div>
                      <div className="ml-auto flex-shrink-0">
                        {isActive ? (
                            <div className="flex items-center gap-2 text-accent">
                                <Tv className="w-5 h-5 animate-pulse" />
                                <span>Now Playing</span>
                            </div>
                        ) : (
                            <PlayCircle className="w-7 h-7 text-primary/70 group-hover:text-accent transition-colors" />
                        )}
                      </div>
                    </Link>
                  )
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
