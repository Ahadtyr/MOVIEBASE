export interface TMDBCastMember {
  id: number;
  name: string;
  character?: string; // Character name
  profile_path: string | null;
  known_for_department?: string;
}

export interface Movie {
  id: number; // TMDb uses numbers for IDs
  title: string;
  poster_path: string | null;
  backdrop_path: string | null; // For banners
  overview: string; // Synopsis
  release_date: string; // TMDb format: "YYYY-MM-DD"
  vote_average: number; // Rating
  genres: { id: number; name: string }[]; // TMDb provides genre objects
  runtime?: number; // Duration in minutes
  // Fields that might come from specific endpoints like /movie/{id}
  credits?: { cast: TMDBCastMember[] };
  similar?: { results: Movie[] };
}

// Keeping TVShow structure for now, can be updated to TMDb format later
export interface TVShow {
  id: string; // Placeholder ID might be string
  title: string;
  posterUrl: string; // Placeholder URL
  bannerUrl: string; // Placeholder URL
  synopsis: string;
  releaseDate: string;
  rating: number;
  genres: string[]; // Placeholder genres might be string array
  cast: CastMember[]; // Placeholder cast type
  seasons?: number;
  episodes?: number;
}

// Original CastMember type for placeholder data, if still needed elsewhere
export interface CastMember {
  id: string;
  name: string;
  character: string;
  imageUrl: string;
}
