
import PageContainer from '@/components/shared/PageContainer';
import SectionTitle from '@/components/shared/SectionTitle';
import { getMovieDetails, getTVShowDetails, getTVSeasonDetails } from '@/lib/tmdb';
import { notFound } from 'next/navigation';
import { ExternalLink, Tv, Film } from 'lucide-react';
import Link from 'next/link';
import EpisodeList from '@/components/tv/EpisodeList';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import ResponsivePlayer from '@/components/player/ResponsivePlayer';
import { cn } from '@/lib/utils';

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

  const getPlayerPath = (player: string) => `/player/${type}/${id}?s=${seasonNumber}&e=${episodeNumber}&player=${player}`;

  const playerPaths = {
    p1: getPlayerPath('1'),
    p2: getPlayerPath('2'),
    p3: getPlayerPath('3'),
    p4: getPlayerPath('4'),
  };

  const embedSrc = {
    p1: '',
    p2: '',
    p3: '',
    p4: '',
  };

  if (type === 'movie') {
    const movie = await getMovieDetails(tmdbId);
    if (!movie) notFound();
    title = movie.title;
    itemUrl = `/movie/${tmdbId}`;
    embedSrc.p1 = `https://vidsrcme.su/embed/movie/${tmdbId}`;
    embedSrc.p2 = `https://embed.smashystream.com/playere.php?tmdb=${tmdbId}`;
    embedSrc.p3 = `https://vidnest.fun/movie/${tmdbId}`;
    embedSrc.p4 = `https://vidfast.pro/movie/${tmdbId}`;
  } else {
    const show = await getTVShowDetails(tmdbId);
    if (!show) notFound();
    title = `${show.name} - S${seasonNumber} E${episodeNumber}`;
    itemUrl = `/tv-show/${tmdbId}`;
    embedSrc.p1 = `https://vidsrcme.su/embed/tv/${tmdbId}/${seasonNumber}/${episodeNumber}`;
    embedSrc.p2 = `https://embed.smashystream.com/playere.php?tmdb=${tmdbId}&season=${seasonNumber}&episode=${episodeNumber}`;
    embedSrc.p3 = `https://vidnest.fun/tv/${tmdbId}/${seasonNumber}/${episodeNumber}`;
    embedSrc.p4 = `https://vidfast.pro/tv/${tmdbId}/${seasonNumber}/${episodeNumber}?autoPlay=true`;

    if (show.seasons) {
      const seasonDetailPromises = show.seasons
        .filter(s => s.season_number > 0)
        .map(s => getTVSeasonDetails(tmdbId, s.season_number));
      
      const results = await Promise.all(seasonDetailPromises);
      seasonsData = results.filter(s => s !== null);
    }
  }

  const PlayerButton = ({ player, serverNumber }: { player: '1' | '2' | '3' | '4', serverNumber: string }) => (
    <Link href={getPlayerPath(player)} scroll={false}>
      <div
        className={cn(
          "w-full text-center px-4 py-2.5 rounded-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105",
          selectedPlayer === player
            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/40"
            : "bg-card hover:bg-primary/20 text-muted-foreground hover:text-foreground border border-border"
        )}
      >
        Server {serverNumber}
      </div>
    </Link>
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
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 max-w-xl mx-auto mb-6">
            <PlayerButton player="1" serverNumber="1" />
            <PlayerButton player="2" serverNumber="2" />
            <PlayerButton player="3" serverNumber="3" />
            <PlayerButton player="4" serverNumber="4" />
        </div>
        <TabsContent value="1">
            <ResponsivePlayer 
              src={embedSrc.p1}
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
            />
        </TabsContent>
        <TabsContent value="2">
            <ResponsivePlayer
              src={embedSrc.p2}
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
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
              allow="encrypted-media"
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
