
import PageContainer from '@/components/shared/PageContainer';
import SectionTitle from '@/components/shared/SectionTitle';
import { getMovieDetails, getTVShowDetails, getTVSeasonDetails } from '@/lib/tmdb';
import { notFound } from 'next/navigation';
import { ExternalLink, Tv, Film } from 'lucide-react';
import Link from 'next/link';
import EpisodeList from '@/components/tv/EpisodeList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ResponsivePlayer from '@/components/player/ResponsivePlayer';

interface PlayerPageProps {
  params: {
    type: 'movie' | 'tv';
    id: string;
  };
  searchParams: {
    s?: string;
    e?: string;
    player?: '1' | '2' | '3' | '4';
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
  let seasonsData = null;

  const playerPaths = {
      p1: `/player/${type}/${id}?s=${seasonNumber}&e=${episodeNumber}&player=1`,
      p2: `/player/${type}/${id}?s=${seasonNumber}&e=${episodeNumber}&player=2`,
      p3: `/player/${type}/${id}?s=${seasonNumber}&e=${episodeNumber}&player=3`,
      p4: `/player/${type}/${id}?s=${seasonNumber}&e=${episodeNumber}&player=4`,
  };

  const embedSrc = {
      p1: '',
      p2: '',
      p3: '',
      p4: '',
  }

  if (type === 'movie') {
    const movie = await getMovieDetails(tmdbId);
    if (!movie) notFound();
    title = movie.title;
    itemUrl = `/movie/${tmdbId}`;
    embedSrc.p1 = `https://watchsb.com/e/${tmdbId}`;
    embedSrc.p2 = `https://embed.smashystream.com/playere.php?tmdb=${tmdbId}`;
    embedSrc.p3 = `https://player.vidplus.to/embed/movie/${tmdbId}`;
    embedSrc.p4 = `https://ansi.to/e/${tmdbId}`;
  } else {
    const show = await getTVShowDetails(tmdbId);
    if (!show) notFound();
    title = `${show.name} - S${seasonNumber} E${episodeNumber}`;
    itemUrl = `/tv-show/${tmdbId}`;
    embedSrc.p1 = `https://watchsb.com/e/${tmdbId}-${seasonNumber}-${episodeNumber}`;
    embedSrc.p2 = `https://embed.smashystream.com/playere.php?tmdb=${tmdbId}&season=${seasonNumber}&episode=${episodeNumber}`;
    embedSrc.p3 = `https://player.vidplus.to/embed/tv/${tmdbId}?s=${seasonNumber}&e=${episodeNumber}`;
    embedSrc.p4 = `https://ansi.to/e/${tmdbId}?s=${seasonNumber}&e=${episodeNumber}`;

    if (show.seasons) {
        const seasonDetailPromises = show.seasons
            .filter(s => s.season_number > 0)
            .map(s => getTVSeasonDetails(tmdbId, s.season_number));
        
        const results = await Promise.all(seasonDetailPromises);
        seasonsData = results.filter(s => s !== null);
    }
  }

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
        <TabsList className="grid w-full grid-cols-4 max-w-md mx-auto mb-4">
          <Link href={playerPaths.p1} scroll={false}><TabsTrigger value="1" className="w-full">Player 1</TabsTrigger></Link>
          <Link href={playerPaths.p2} scroll={false}><TabsTrigger value="2" className="w-full">Player 2</TabsTrigger></Link>
          <Link href={playerPaths.p3} scroll={false}><TabsTrigger value="3" className="w-full">Player 3</TabsTrigger></Link>
          <Link href={playerPaths.p4} scroll={false}><TabsTrigger value="4" className="w-full">Player 4</TabsTrigger></Link>
        </TabsList>
        <TabsContent value="1">
            <ResponsivePlayer 
              src={embedSrc.p1}
              sandbox="allow-scripts allow-same-origin allow-presentation"
            />
        </TabsContent>
        <TabsContent value="2">
            <ResponsivePlayer
              src={embedSrc.p2}
              sandbox="allow-scripts allow-same-origin allow-presentation"
            />
        </TabsContent>
        <TabsContent value="3">
           <ResponsivePlayer
              src={embedSrc.p3}
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
            />
        </TabsContent>
        <TabsContent value="4">
           <ResponsivePlayer
              src={embedSrc.p4}
              sandbox="allow-scripts allow-same-origin allow-presentation"
            />
        </TabsContent>
      </Tabs>

       <div className="mt-4 text-center text-sm text-muted-foreground">
        <p>If a player does not load, try switching to another server. Availability may vary.</p>
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
