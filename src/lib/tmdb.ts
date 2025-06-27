import type { Movie, TVShow, TMDBCastMember, Genre } from './types';

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

interface TMDbGenreList {
  genres: Genre[];
}

interface TMDbMovieDetail extends Omit<Movie, 'genres' | 'credits' | 'similar' | 'runtime'> {
  genres: TMDbGenre[];
  runtime: number | null;
}

interface TMDbTVShowDetail extends Omit<TVShow, 'genres' | 'credits' | 'similar' | 'number_of_seasons' | 'number_of_episodes'> {
  genres: TMDbGenre[];
  number_of_seasons: number;
  number_of_episodes: number;
}


async function fetchFromTMDB<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  if (!API_KEY || API_KEY === 'YOUR_TMDB_API_KEY_HERE') {
    throw new Error('TMDB API key is not configured. Please get a free key from themoviedb.org and add it to a .env.local file as TMDB_API_KEY=your_key_here');
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

// Movie Functions
function mapTMDbMovie(tmdbMovie: any): Movie {
  return {
    id: tmdbMovie.id,
    title: tmdbMovie.title,
    poster_path: tmdbMovie.poster_path,
    backdrop_path: tmdbMovie.backdrop_path,
    overview: tmdbMovie.overview,
    release_date: tmdbMovie.release_date,
    vote_average: tmdbMovie.vote_average,
    genres: tmdbMovie.genres || [],
    runtime: tmdbMovie.runtime,
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

export async function getMovieGenres(): Promise<Genre[]> {
  const data = await fetchFromTMDB<TMDbGenreList>('genre/movie/list');
  return data.genres;
}

export async function getDiscoverMovies(genreId: string, page: number = 1): Promise<{ movies: Movie[], totalPages: number }> {
  const data = await fetchFromTMDB<TMDbListResponse<TMDbMovieDetail>>('discover/movie', {
    with_genres: genreId,
    sort_by: 'popularity.desc',
    page: page.toString(),
  });
  // The TMDb API caps total_pages at 500
  const totalPages = data.total_pages > 500 ? 500 : data.total_pages;
  return {
    movies: data.results.map(mapTMDbMovie),
    totalPages,
  };
}

// TV Show Functions
function mapTMDbTVShow(tmdbTVShow: any): TVShow {
  return {
    id: tmdbTVShow.id,
    name: tmdbTVShow.name,
    poster_path: tmdbTVShow.poster_path,
    backdrop_path: tmdbTVShow.backdrop_path,
    overview: tmdbTVShow.overview,
    first_air_date: tmdbTVShow.first_air_date,
    vote_average: tmdbTVShow.vote_average,
    genres: tmdbTVShow.genres || [],
    number_of_seasons: tmdbTVShow.number_of_seasons,
    number_of_episodes: tmdbTVShow.number_of_episodes,
    // Note: 'title' is added for compatibility with MovieCard, which expects a 'title' prop
    title: tmdbTVShow.name,
  };
}

export async function getPopularTVShows(): Promise<TVShow[]> {
  const data = await fetchFromTMDB<TMDbListResponse<TMDbTVShowDetail>>('tv/popular');
  return data.results.map(mapTMDbTVShow);
}

export async function getTopRatedTVShows(): Promise<TVShow[]> {
  const data = await fetchFromTMDB<TMDbListResponse<TMDbTVShowDetail>>('tv/top_rated');
  return data.results.map(mapTMDbTVShow);
}

export async function getTVShowDetails(tvId: number): Promise<TVShow | null> {
  try {
    const data = await fetchFromTMDB<TMDbTVShowDetail>(`tv/${tvId}`);
    return mapTMDbTVShow(data);
  } catch (error) {
    console.error(`Error fetching details for TV show ID ${tvId}:`, error);
    return null;
  }
}

export async function getTVShowCredits(tvId: number): Promise<{ cast: TMDBCastMember[] }> {
  try {
    const data = await fetchFromTMDB<{ cast: TMDBCastMember[], crew: any[] }>(`tv/${tvId}/credits`);
    return { cast: data.cast };
  } catch (error) {
    console.error(`Error fetching credits for TV show ID ${tvId}:`, error);
    return { cast: [] };
  }
}

export async function getSimilarTVShows(tvId: number): Promise<TVShow[]> {
  try {
    const data = await fetchFromTMDB<TMDbListResponse<TMDbTVShowDetail>>(`tv/${tvId}/similar`);
    return data.results.map(mapTMDbTVShow);
  } catch (error) {
    console.error(`Error fetching similar TV shows for TV ID ${tvId}:`, error);
    return [];
  }
}
