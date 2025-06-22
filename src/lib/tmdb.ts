import type { Movie, TMDBCastMember } from './types';

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
export const IMAGE_BASE_URL_W500 = 'https://image.tmdb.org/t/p/w500';
export const IMAGE_BASE_URL_ORIGINAL = 'https://image.tmdb.org/t/p/original';

interface TMDbListResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

interface TMDbGenre {
  id: number;
  name: string;
}

interface TMDbMovieDetail extends Omit<Movie, 'genres' | 'credits' | 'similar' | 'runtime'> {
  genres: TMDbGenre[];
  runtime: number | null; // runtime can be null
}

async function fetchFromTMDB<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  if (!API_KEY) {
    throw new Error('TMDB API key is not configured. Please set TMDB_API_KEY in your environment variables.');
  }
  const urlParams = new URLSearchParams({ ...params, api_key: API_KEY });
  const url = `${BASE_URL}/${endpoint}?${urlParams.toString()}`;

  try {
    const response = await fetch(url, { next: { revalidate: 3600 } }); // Cache for 1 hour
    if (!response.ok) {
      console.error(`Error fetching from TMDb: ${response.status} ${response.statusText} for URL: ${url}`);
      const errorBody = await response.text();
      console.error('Error body:', errorBody);
      throw new Error(`Failed to fetch data from TMDb: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error(`Network error or JSON parsing error fetching from TMDb: ${url}`, error);
    throw error;
  }
}

function mapTMDbMovie(tmdbMovie: any): Movie {
  return {
    id: tmdbMovie.id,
    title: tmdbMovie.title,
    poster_path: tmdbMovie.poster_path,
    backdrop_path: tmdbMovie.backdrop_path,
    overview: tmdbMovie.overview,
    release_date: tmdbMovie.release_date,
    vote_average: tmdbMovie.vote_average,
    genres: tmdbMovie.genres || [], // Ensure genres is an array
    runtime: tmdbMovie.runtime,
    // credits and similar will be populated by separate calls if needed
  };
}


export async function getPopularMovies(): Promise<Movie[]> {
  const data = await fetchFromTMDB<TMDbListResponse<TMDbMovieDetail>>('movie/popular');
  return data.results.map(mapTMDbMovie);
}

export async function getUpcomingMovies(): Promise<Movie[]> {
  const data = await fetchFromTMDB<TMDbListResponse<TMDbMovieDetail>>('movie/upcoming');
  return data.results.map(mapTMDbMovie);
}

export async function getTopRatedMovies(): Promise<Movie[]> {
  const data = await fetchFromTMDB<TMDbListResponse<TMDbMovieDetail>>('movie/top_rated');
  return data.results.map(mapTMDbMovie);
}

export async function getMovieDetails(movieId: number): Promise<Movie | null> {
  try {
    const data = await fetchFromTMDB<TMDbMovieDetail>(`movie/${movieId}`);
    return mapTMDbMovie(data);
  } catch (error) {
    console.error(`Error fetching details for movie ID ${movieId}:`, error);
    return null;
  }
}

export async function getMovieCredits(movieId: number): Promise<{ cast: TMDBCastMember[] }> {
   try {
    const data = await fetchFromTMDB<{ cast: TMDBCastMember[], crew: any[] }>(`movie/${movieId}/credits`);
    return { cast: data.cast };
  } catch (error) {
    console.error(`Error fetching credits for movie ID ${movieId}:`, error);
    return { cast: [] };
  }
}

export async function getSimilarMovies(movieId: number): Promise<Movie[]> {
  try {
    const data = await fetchFromTMDB<TMDbListResponse<TMDbMovieDetail>>(`movie/${movieId}/similar`);
    return data.results.map(mapTMDbMovie);
  } catch (error) {
    console.error(`Error fetching similar movies for movie ID ${movieId}:`, error);
    return [];
  }
}

// TODO: Add functions for TV shows, search, genres later
// export async function searchMovies(query: string): Promise<Movie[]>
// export async function getGenres(): Promise<Genre[]>
// export async function getMoviesByGenre(genreId: number): Promise<Movie[]>
