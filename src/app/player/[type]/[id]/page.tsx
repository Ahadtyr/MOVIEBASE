
import PageContainer from '@/components/shared/PageContainer';
import SectionTitle from '@/components/shared/SectionTitle';
import { getMovieDetails, getTVShowDetails, getTVSeasonDetails } from '@/lib/tmdb';
import { notFound } from 'next/navigation';
import { ExternalLink, Tv, Film } from 'lucide-react';
import Link from 'next/link';
import EpisodeList from '@/components/tv/EpisodeList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PlayerPageProps {
  params: {
    type: 'movie' | 'tv';
    id: string;
  };
  searchParams: {
    s?: string;
    e?: string;
    player?: '1' | '2';
  };
}

export default async function PlayerPage({ params, searchParams }: PlayerPageProps) {
  const { type, id } = params;
  const tmdbId = parseInt(id, 10);
  const seasonNumber = parseInt(searchParams.s || '1', 10);
  const episodeNumber = parseInt(searchParams.e || '1', 10);
  const selectedPlayer = searchParams.player || '1';

  if (isNaN(tmdbId) || (type !== 'movie' && type !== 'tv')) {
    notFound();
  }

  let title = 'Player';
  let itemUrl = '';
  let embedSrc1 = '';
  let embedSrc2 = '';
  let seasonsData = null;

  const player1Path = `/player/${type}/${id}?s=${seasonNumber}&e=${episodeNumber}&player=1`;
  const player2Path = `/player/${type}/${id}?s=${seasonNumber}&e=${episodeNumber}&player=2`;

  if (type === 'movie') {
    const movie = await getMovieDetails(tmdbId);
    if (!movie) notFound();
    title = movie.title;
    itemUrl = `/movie/${tmdbId}`;
    embedSrc1 = `https://vidsrc.to/embed/movie/${tmdbId}`;
    embedSrc2 = `https://www.2embed.to/embed/tmdb/movie?id=${tmdbId}`;
  } else {
    const show = await getTVShowDetails(tmdbId);
    if (!show) notFound();
    title = `${show.name} - S${seasonNumber} E${episodeNumber}`;
    itemUrl = `/tv-show/${tmdbId}`;
    embedSrc1 = `https://vidsrc.to/embed/tv/${tmdbId}/${seasonNumber}/${episodeNumber}`;
    embedSrc2 = `https://www.2embed.to/embed/tmdb/tv?id=${tmdbId}&s=${seasonNumber}&e=${episodeNumber}`;

    // Fetch all seasons data
    if (show.seasons) {
        const seasonDetailPromises = show.seasons
            .filter(s => s.season_number > 0) // Exclude season 0 which is usually "Specials"
            .map(s => getTVSeasonDetails(tmdbId, s.season_number));
        
        const results = await Promise.all(seasonDetailPromises);
        seasonsData = results.filter(s => s !== null);
    }
  }

  const PlayerFrame = ({ src, title }: { src: string, title: string }) => (
    <div className="aspect-video w-full rounded-lg overflow-hidden shadow-2xl shadow-primary/20 bg-black">
      <iframe
        src={src}
        width="100%"
        height="100%"
        frameBorder="0"
        allowFullScreen
        title={title}
        key={src} // Force re-render on src change
      ></iframe>
    </div>
  );

  return (
    <PageContainer>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
        <SectionTitle className="mb-0 flex items-center text-xl sm:text-3xl">
            {type === 'movie' ? <Film className="w-8 h-8 mr-3 text-primary"/> : <Tv className="w-8 h-8 mr-3 text-primary"/> }
            Now Playing: {title}
        </SectionTitle>
        <Link href={itemUrl} className="flex items-center text-muted-foreground hover:text-primary transition-colors flex-shrink-0">
            Back to Details <ExternalLink className="w-4 h-4 ml-2"/>
        </Link>
      </div>

      <Tabs defaultValue={selectedPlayer} className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-sm mx-auto mb-4">
          <Link href={player1Path} scroll={false}><TabsTrigger value="1" className="w-full">Player 1</TabsTrigger></Link>
          <Link href={player2Path} scroll={false}><TabsTrigger value="2" className="w-full">Player 2</TabsTrigger></Link>
        </TabsList>
        <TabsContent value="1">
          <PlayerFrame src={embedSrc1} title={`Playback for ${title} on Player 1`} />
        </TabsContent>
        <TabsContent value="2">
          <PlayerFrame src={embedSrc2} title={`Playback for ${title} on Player 2`} />
        </TabsContent>
      </Tabs>

       <div className="mt-4 text-center text-sm text-muted-foreground">
        <p>If a player does not load, try switching to the other player. Availability may vary.</p>
        <p>This content is provided by external services. MOVIEBASE does not host any media files.</p>
      </div>

      {type === 'tv' && seasonsData && seasonsData.length > 0 && (
        <div className="mt-12">
            <EpisodeList 
                tvShowId={tmdbId}
                seasons={seasonsData}
                currentSeason={seasonNumber}
                currentEpisode={episodeNumber}
            />
        </div>
      )}
    </PageContainer>
  );
}
