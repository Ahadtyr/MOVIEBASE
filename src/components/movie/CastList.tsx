import Image from 'next/image';
import type { TMDBCastMember } from '@/lib/types';
import SectionTitle from '@/components/shared/SectionTitle';
import { IMAGE_BASE_URL_W500 } from '@/lib/tmdb';

interface CastListProps {
  cast: TMDBCastMember[];
}

export default function CastList({ cast }: CastListProps) {
  if (!cast || cast.length === 0) {
    return null;
  }

  return (
    <div className="py-8">
      <SectionTitle>Cast</SectionTitle>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {cast.map((member) => (
          <div key={member.id} className="text-center group">
            <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden mb-2 shadow-md group-hover:shadow-accent/30 transition-shadow duration-300">
              <Image
                src={member.profile_path ? `${IMAGE_BASE_URL_W500}${member.profile_path}` : 'https://placehold.co/200x300.png'}
                alt={member.name}
                width={200}
                height={300}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                data-ai-hint="actor headshot"
              />
            </div>
            <h4 className="font-semibold text-primary-foreground text-sm group-hover:text-accent transition-colors duration-300">{member.name}</h4>
            {member.character && <p className="text-xs text-muted-foreground">{member.character}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
