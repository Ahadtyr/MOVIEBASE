
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
    player?: '1' | '2' | '3' | '4' | '5' | '6';
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

  const embedSrc = {
    p1: '',
    p2: '',
    p3: '',
    p4: '',
    p5: '',
    p6: '',
  };

  if (type === 'movie') {
    const movie = await getMovieDetails(tmdbId);
    if (!movie) notFound();
    title = movie.title;
    itemUrl = `/movie/${tmdbId}`;
    embedSrc.p1 = `https://vsrc.su/embed/movie/${tmdbId}`;
    embedSrc.p2 = `https://embed.smashystream.com/playere.php?tmdb=${tmdbId}`;
    embedSrc.p3 = `https://vidnest.fun/movie/${tmdbId}`;
    embedSrc.p4 = `https://vidfast.pro/movie/${tmdbId}?autoPlay=true`;
    embedSrc.p5 = `https://player.videasy.net/movie/${tmdbId}`;
    embedSrc.p6 = `https://cinemaos.tech/player/${tmdbId}`;
  } else {
    const show = await getTVShowDetails(tmdbId);
    if (!show) notFound();
    title = `${show.name} - S${seasonNumber} E${episodeNumber}`;
    itemUrl = `/tv-show/${tmdbId}`;
    embedSrc.p1 = `https://vsrc.su/embed/tv/${tmdbId}/${seasonNumber}/${episodeNumber}`;
    embedSrc.p2 = `https://embed.smashystream.com/playere.php?tmdb=${tmdbId}&season=${seasonNumber}&episode=${episodeNumber}`;
    embedSrc.p3 = `https://vidnest.fun/tv/${tmdbId}/${seasonNumber}/${episodeNumber}`;
    embedSrc.p4 = `https://vidfast.pro/tv/${tmdbId}/${seasonNumber}/${episodeNumber}?autoPlay=true`;
    embedSrc.p5 = `https://player.videasy.net/tv/${tmdbId}/${seasonNumber}/${episodeNumber}`;
    embedSrc.p6 = `https://cinemaos.tech/player/${tmdbId}/${seasonNumber}/${episodeNumber}`;

    if (show.seasons) {
      const seasonDetailPromises = show.seasons
        .filter(s => s.season_number > 0)
        .map(s => getTVSeasonDetails(tmdbId, s.season_number));
      
      const results = await Promise.all(seasonDetailPromises);
      seasonsData = results.filter(s => s !== null);
    }
  }
  
  const commonIframeProps = {
    className: "absolute top-0 left-0 h-full w-full border-0",
    allow: "autoplay; encrypted-media; picture-in-picture",
    allowFullScreen: true,
    referrerPolicy: "no-referrer" as React.ReferrerPolicy,
  };

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
        <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 md:gap-4 max-w-3xl mx-auto mb-6 bg-transparent p-0">
          <TabsTrigger value="1" asChild>
             <Link href={`?player=1&s=${seasonNumber}&e=${episodeNumber}`} scroll={false} className="w-full text-center px-4 py-2.5 rounded-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/40 data-[state=inactive]:bg-card data-[state=inactive]:hover:bg-primary/20 data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:text-foreground data-[state=inactive]:border data-[state=inactive]:border-border">
                Server 1
              </Link>
          </TabsTrigger>
          <TabsTrigger value="2" asChild>
              <Link href={`?player=2&s=${seasonNumber}&e=${episodeNumber}`} scroll={false} className="w-full text-center px-4 py-2.5 rounded-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/40 data-[state=inactive]:bg-card data-[state=inactive]:hover:bg-primary/20 data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:text-foreground data-[state=inactive]:border data-[state=inactive]:border-border">
                Server 2
              </Link>
          </TabsTrigger>
          <TabsTrigger value="3" asChild>
              <Link href={`?player=3&s=${seasonNumber}&e=${episodeNumber}`} scroll={false} className="w-full text-center px-4 py-2.5 rounded-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/40 data-[state=inactive]:bg-card data-[state=inactive]:hover:bg-primary/20 data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:text-foreground data-[state=inactive]:border data-[state=inactive]:border-border">
                Server 3
              </Link>
          </TabsTrigger>
          <TabsTrigger value="4" asChild>
              <Link href={`?player=4&s=${seasonNumber}&e=${episodeNumber}`} scroll={false} className="w-full text-center px-4 py-2.5 rounded-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/40 data-[state=inactive]:bg-card data-[state=inactive]:hover:bg-primary/20 data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:text-foreground data-[state=inactive]:border data-[state=inactive]:border-border">
                Server 4
              </Link>
          </TabsTrigger>
          <TabsTrigger value="5" asChild>
              <Link href={`?player=5&s=${seasonNumber}&e=${episodeNumber}`} scroll={false} className="w-full text-center px-4 py-2.5 rounded-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/40 data-[state=inactive]:bg-card data-[state=inactive]:hover:bg-primary/20 data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:text-foreground data-[state=inactive]:border data-[state=inactive]:border-border">
                Server 5
              </Link>
          </TabsTrigger>
          <TabsTrigger value="6" asChild>
              <Link href={`?player=6&s=${seasonNumber}&e=${episodeNumber}`} scroll={false} className="w-full text-center px-4 py-2.5 rounded-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/40 data-[state=inactive]:bg-card data-[state=inactive]:hover:bg-primary/20 data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:text-foreground data-[state=inactive]:border data-[state=inactive]:border-border">
                Server 6
              </Link>
          </TabsTrigger>
        </TabsList>
        
        <div className="relative w-full overflow-hidden rounded-lg bg-black" style={{ paddingBottom: '56.25%' }}>
            <TabsContent value="1" className="absolute inset-0 w-full h-full m-0">
                <iframe src={embedSrc.p1} {...commonIframeProps} />
            </TabsContent>
            <TabsContent value="2" className="absolute inset-0 w-full h-full m-0">
                <iframe src={embedSrc.p2} {...commonIframeProps} />
            </TabsContent>
            <TabsContent value="3" className="absolute inset-0 w-full h-full m-0">
                <iframe src={embedSrc.p3} {...commonIframeProps} />
            </TabsContent>
            <TabsContent value="4" className="absolute inset-0 w-full h-full m-0">
                <iframe src={embedSrc.p4} {...commonIframeProps} />
            </TabsContent>
            <TabsContent value="5" className="absolute inset-0 w-full h-full m-0">
                <iframe src={embedSrc.p5} {...commonIframeProps} />
            </TabsContent>
            <TabsContent value="6" className="absolute inset-0 w-full h-full m-0">
                <iframe src={embedSrc.p6} {...commonIframeProps} />
            </TabsContent>
        </div>
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
