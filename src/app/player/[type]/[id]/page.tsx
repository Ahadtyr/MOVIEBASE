
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
    player?: '1' | '2' | '3';
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
  let embedSrc3 = '';
  let seasonsData = null;

  const player1Path = `/player/${type}/${id}?s=${seasonNumber}&e=${episodeNumber}&player=1`;
  const player2Path = `/player/${type}/${id}?s=${seasonNumber}&e=${episodeNumber}&player=2`;
  const player3Path = `/player/${type}/${id}?s=${seasonNumber}&e=${episodeNumber}&player=3`;

  if (type === 'movie') {
    const movie = await getMovieDetails(tmdbId);
    if (!movie) notFound();
    title = movie.title;
    itemUrl = `/movie/${tmdbId}`;
    embedSrc1 = `https://watchsb.com/e/${tmdbId}`;
    embedSrc2 = `https://embed.smashystream.com/playere.php?tmdb=${tmdbId}`;
    embedSrc3 = `https://player.vidplus.to/embed/movie/${tmdbId}`;
  } else {
    const show = await getTVShowDetails(tmdbId);
    if (!show) notFound();
    title = `${show.name} - S${seasonNumber} E${episodeNumber}`;
    itemUrl = `/tv-show/${tmdbId}`;
    embedSrc1 = `https://watchsb.com/e/${tmdbId}-${seasonNumber}-${episodeNumber}`;
    embedSrc2 = `https://embed.smashystream.com/playere.php?tmdb=${tmdbId}&season=${seasonNumber}&episode=${episodeNumber}`;
    embedSrc3 = `https://player.vidplus.to/embed/tv/${tmdbId}?s=${seasonNumber}&e=${episodeNumber}`;

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
        <TabsList className="grid w-full grid-cols-3 max-w-sm mx-auto mb-4">
          <Link href={player1Path} scroll={false}><TabsTrigger value="1" className="w-full">Player 1</TabsTrigger></Link>
          <Link href={player2Path} scroll={false}><TabsTrigger value="2" className="w-full">Player 2</TabsTrigger></Link>
          <Link href={player3Path} scroll={false}><TabsTrigger value="3" className="w-full">Player 3</TabsTrigger></Link>
        </TabsList>
        <TabsContent value="1">
            <div className="aspect-video w-full rounded-lg overflow-hidden shadow-2xl shadow-primary/20 bg-black">
                <iframe
                    src={embedSrc1}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allowFullScreen
                    title={`Playback for ${title} on Player 1`}
                    key={embedSrc1}
                    sandbox="allow-scripts allow-same-origin allow-presentation"
                    allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                ></iframe>
            </div>
        </TabsContent>
        <TabsContent value="2">
            <div className="aspect-video w-full rounded-lg overflow-hidden shadow-2xl shadow-primary/20 bg-black">
                <iframe
                    src={embedSrc2}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allowFullScreen
                    title={`Playback for ${title} on Player 2`}
                    key={embedSrc2}
                    sandbox="allow-scripts allow-same-origin allow-presentation"
                    allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                ></iframe>
            </div>
        </TabsContent>
        <TabsContent value="3">
           <div className="aspect-video w-full rounded-lg overflow-hidden shadow-2xl shadow-primary/20 bg-black">
              <iframe
                  src={embedSrc3}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allowFullScreen
                  title={`Playback for ${title} on Player 3`}
                  key={embedSrc3}
                  allow="encrypted-media"
              ></iframe>
            </div>
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
