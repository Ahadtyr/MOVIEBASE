export interface CastMember {
  id: string;
  name: string;
  character: string;
  imageUrl: string;
}

export interface Movie {
  id: string;
  title: string;
  posterUrl: string;
  bannerUrl: string;
  synopsis: string;
  releaseDate: string;
  rating: number;
  genres: string[];
  cast: CastMember[];
  duration?: string; // e.g., "2h 30m"
}

export interface TVShow extends Movie {
  seasons?: number;
  episodes?: number;
}
