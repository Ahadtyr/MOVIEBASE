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
  seasons?: TVSeason[];
  // credits and similar from specific calls
  credits?: { cast: TMDBCastMember[] };
  similar?: { results: TVShow[] };
}

export interface TVSeason {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string | null;
    season_number: number;
}

export interface TVEpisode {
    id: number;
    name: string;
    overview: string;
    episode_number: number;
    season_number: number;
    still_path: string | null;
    air_date: string;
}

export interface TVSeasonDetails extends TVSeason {
    episodes: TVEpisode[];
}
