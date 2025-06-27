export interface Genre {
  id: number;
  name: string;
}

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

export interface TVShow {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  first_air_date: string;
  vote_average: number;
  genres: { id: number; name: string }[];
  number_of_seasons?: number;
  number_of_episodes?: number;
  // credits and similar from specific calls
  credits?: { cast: TMDBCastMember[] };
  similar?: { results: TVShow[] };
}
