import PageContainer from '@/components/shared/PageContainer';
import SectionTitle from '@/components/shared/SectionTitle';
import { getMovieDetails, getTVShowDetails } from '@/lib/tmdb';
import { notFound } from 'next/navigation';
import { ExternalLink, Tv, Film } from 'lucide-react';
import Link from 'next/link';

interface PlayerPageProps {
  params: {
    type: 'movie' | 'tv';
    id: string;
  };
  searchParams: {
    s?: string;
    e?: string;
  };
}

export default async function PlayerPage({ params, searchParams }: PlayerPageProps) {
  const { type, id } = params;
  const tmdbId = parseInt(id, 10);

  if (isNaN(tmdbId) || (type !== 'movie' && type !== 'tv')) {
    notFound();
  }

  let title = 'Player';
  let itemUrl = '';
  let embedSrc = '';

  if (type === 'movie') {
    const movie = await getMovieDetails(tmdbId);
    if (!movie) notFound();
    title = movie.title;
    itemUrl = `/movie/${tmdbId}`;
    embedSrc = `https://www.vidking.net/embed/movie/${tmdbId}`;
  } else {
    const show = await getTVShowDetails(tmdbId);
    if (!show) notFound();
    const season = searchParams.s || '1';
    const episode = searchParams.e || '1';
    title = `${show.name} - S${season} E${episode}`;
    itemUrl = `/tv-show/${tmdbId}`;
    embedSrc = `https://www.vidking.net/embed/tv/${tmdbId}/${season}/${episode}`;
  }

  return (
    <PageContainer>
      <div className="flex items-center justify-between mb-4">
        <SectionTitle className="mb-0 flex items-center">
            {type === 'movie' ? <Film className="w-8 h-8 mr-3 text-primary"/> : <Tv className="w-8 h-8 mr-3 text-primary"/> }
            Now Playing: {title}
        </SectionTitle>
        <Link href={itemUrl} className="flex items-center text-muted-foreground hover:text-primary transition-colors">
            Back to Details <ExternalLink className="w-4 h-4 ml-2"/>
        </Link>
      </div>
      <div className="aspect-video w-full rounded-lg overflow-hidden shadow-2xl shadow-primary/20 bg-black">
        <iframe
          src={embedSrc}
          width="100%"
          height="100%"
          frameBorder="0"
          allowFullScreen
          title={`Playback for ${title}`}
        ></iframe>
      </div>
       <div className="mt-4 text-center text-sm text-muted-foreground">
        <p>If the player does not load, it may be due to regional restrictions or content availability.</p>
        <p>This content is provided by an external service. MOVIEBASE does not host any media files.</p>
      </div>
    </PageContainer>
  );
}
