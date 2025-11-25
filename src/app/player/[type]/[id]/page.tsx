
import PageContainer from '@/components/shared/PageContainer';
import SectionTitle from '@/components/shared/SectionTitle';
import { getMovieDetails, getTVShowDetails, getTVSeasonDetails } from '@/lib/tmdb';
import { notFound } from 'next/navigation';
import { ExternalLink, Tv, Film } from 'lucide-react';
import Link from 'next/link';
import EpisodeList from '@/components/tv/EpisodeList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
    player?: '1' | '2' | '3' | '4' | '5';
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

  const embedSrc = {
    p1: '',
    p2: '',
    p3: '',
    p4: '',
    p5: '',
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
    embedSrc.p5 = `https://player.videasy.net/movie/${tmdbId}`;
  } else {
    const show = await getTVShowDetails(tmdbId);
    if (!show) notFound();
    title = `${show.name} - S${seasonNumber} E${episodeNumber}`;
    itemUrl = `/tv-show/${tmdbId}`;
    embedSrc.p1 = `https://vidsrcme.su/embed/tv/${tmdbId}/${seasonNumber}/${episodeNumber}`;
    embedSrc.p2 = `https://embed.smashystream.com/playere.php?tmdb=${tmdbId}&season=${seasonNumber}&episode=${episodeNumber}`;
    embedSrc.p3 = `https://vidnest.fun/tv/${tmdbId}/${seasonNumber}/${episodeNumber}`;
    embedSrc.p4 = `https://vidfast.pro/tv/${tmdbId}/${seasonNumber}/${episodeNumber}?autoPlay=true`;
    embedSrc.p5 = `https://player.videasy.net/tv/${tmdbId}/${seasonNumber}/${episodeNumber}`;

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
        <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4 max-w-2xl mx-auto mb-6 bg-transparent p-0">
          <Link href={getPlayerPath('1')} scroll={false} passHref>
            <TabsTrigger value="1" className="w-full text-center px-4 py-2.5 rounded-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/40 data-[state=inactive]:bg-card data-[state=inactive]:hover:bg-primary/20 data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:text-foreground data-[state=inactive]:border data-[state=inactive]:border-border">
              Server 1
            </TabsTrigger>
          </Link>
          <Link href={getPlayerPath('2')} scroll={false} passHref>
            <TabsTrigger value="2" className="w-full text-center px-4 py-2.5 rounded-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/40 data-[state=inactive]:bg-card data-[state=inactive]:hover:bg-primary/20 data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:text-foreground data-[state=inactive]:border data-[state=inactive]:border-border">
              Server 2
            </TabsTrigger>
          </Link>
          <Link href={getPlayerPath('3')} scroll={false} passHref>
            <TabsTrigger value="3" className="w-full text-center px-4 py-2.5 rounded-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/40 data-[state=inactive]:bg-card data-[state=inactive]:hover:bg-primary/20 data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:text-foreground data-[state=inactive]:border data-[state=inactive]:border-border">
              Server 3
            </TabsTrigger>
          </Link>
          <Link href={getPlayerPath('4')} scroll={false} passHref>
            <TabsTrigger value="4" className="w-full text-center px-4 py-2.5 rounded-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/40 data-[state=inactive]:bg-card data-[state=inactive]:hover:bg-primary/20 data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:text-foreground data-[state=inactive]:border data-[state=inactive]:border-border">
              Server 4
            </TabsTrigger>
          </Link>
          <Link href={getPlayerPath('5')} scroll={false} passHref>
            <TabsTrigger value="5" className="w-full text-center px-4 py-2.5 rounded-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/40 data-[state=inactive]:bg-card data-[state=inactive]:hover:bg-primary/20 data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:text-foreground data-[state=inactive]:border data-[state=inactive]:border-border">
              Server 5
            </TabsTrigger>
          </Link>
        </TabsList>
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
        <TabsContent value="5">
           <ResponsivePlayer
              src={embedSrc.p5}
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
              allow="fullscreen"
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
