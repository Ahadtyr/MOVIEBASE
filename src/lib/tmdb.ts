
import type { Movie, TVShow, TMDBCastMember, Genre, TVSeason, TVSeasonDetails } from './types';

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

interface TMDbKeyword {
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
  seasons: TVSeason[];
}


async function fetchFromTMDB<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const API_KEY = process.env.TMDB_API_KEY;
  if (!API_KEY) {
    throw new Error('TMDb API Key is missing. Please add TMDB_API_KEY to your .env.local file.');
  }
  const urlParams = new URLSearchParams({ ...params, api_key: API_KEY });
  const url = `${BASE_URL}/${endpoint}?${urlParams.toString()}`;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
    next: { revalidate: 3600 } // Cache for 1 hour
  };

  try {
    const response = await fetch(url, options);
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

export async function getDiscoverMoviesByParams(params: Record<string, string>, page: number = 1): Promise<Movie[]> {
  const data = await fetchFromTMDB<TMDbListResponse<TMDbMovieDetail>>('discover/movie', {
    ...params,
    sort_by: 'popularity.desc',
    page: page.toString(),
  });
  return data.results.map(mapTMDbMovie);
}

export type BrowseCategory = 'bollywood' | 'hollywood' | 'anime';

export async function getMoviesByCategory(category: BrowseCategory, page: number = 1): Promise<{ movies: Movie[], totalPages: number }> {
    let params: Record<string, string> = {
        sort_by: 'popularity.desc',
        page: page.toString(),
    };

    switch (category) {
        case 'bollywood':
            params.with_original_language = 'hi';
            params.region = 'IN';
            break;
        case 'hollywood':
            params.with_origin_country = 'US';
            break;
        case 'anime':
            params.with_genres = '16'; // Animation
            params.with_keywords = '210024'; // Anime keyword ID
            params.with_origin_country = 'JP';
            break;
    }

    const data = await fetchFromTMDB<TMDbListResponse<TMDbMovieDetail>>('discover/movie', params);
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
    seasons: tmdbTVShow.seasons || [],
    title: tmdbTVShow.name, // for MovieCard compatibility
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

export async function getTVSeasonDetails(tvId: number, seasonNumber: number): Promise<TVSeasonDetails> {
    const data = await fetchFromTMDB<TVSeasonDetails>(`tv/${tvId}/season/${seasonNumber}`);
    return data;
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

export async function getTVShowGenres(): Promise<Genre[]> {
  const data = await fetchFromTMDB<TMDbGenreList>('genre/tv/list');
  return data.genres;
}

export async function getDiscoverTVShowsByParams(params: Record<string, string>, page: number = 1): Promise<TVShow[]> {
  const data = await fetchFromTMDB<TMDbListResponse<TMDbTVShowDetail>>('discover/tv', {
    ...params,
    sort_by: 'popularity.desc',
    page: page.toString(),
  });
  return data.results.map(mapTMDbTVShow);
}

// Search Functions
let genreMap: Map<number, string> | null = null;

async function getGenreMap(): Promise<Map<number, string>> {
  if (genreMap) {
    return genreMap;
  }

  const movieGenresPromise = getMovieGenres();
  const tvGenresPromise = getTVShowGenres();

  const [movieGenres, tvGenres] = await Promise.all([
    movieGenresPromise,
    tvGenresPromise,
  ]);

  const allGenres = [...movieGenres, ...tvGenres];
  const newGenreMap = new Map<number, string>();
  allGenres.forEach(genre => {
    if (!newGenreMap.has(genre.id)) {
      newGenreMap.set(genre.id, genre.name);
    }
  });
  
  genreMap = newGenreMap;
  return genreMap;
}

function mapTMDbSearchResult(item: any, genreMap: Map<number, string>): Movie | TVShow | null {
  const genre_ids = item.genre_ids || [];
  const baseItem = {
    id: item.id,
    poster_path: item.poster_path,
    backdrop_path: item.backdrop_path,
    overview: item.overview,
    vote_average: item.vote_average,
    genres: genre_ids.map((id: number) => ({ id, name: genreMap.get(id) || '' })).filter((g: Genre) => g.name),
  };

  if (item.media_type === 'movie') {
    return {
      ...baseItem,
      title: item.title,
      release_date: item.release_date,
    } as Movie;
  }

  if (item.media_type === 'tv') {
    return {
      ...baseItem,
      name: item.name,
      first_air_date: item.first_air_date,
      title: item.name, // for MovieCard compatibility
    } as TVShow;
  }

  return null;
}

export async function searchMulti(query: string, page: number = 1): Promise<(Movie | TVShow)[]> {
  if (!query) return [];
  try {
    const map = await getGenreMap();
    const data = await fetchFromTMDB<TMDbListResponse<any>>('search/multi', {
      query,
      page: page.toString(),
      include_adult: 'false',
    });
    return data.results
      .map(item => mapTMDbSearchResult(item, map))
      .filter((item): item is Movie | TVShow => item !== null && (item.poster_path || item.backdrop_path) != null);
  } catch (error) {
    console.error(`Error searching for query "${query}":`, error);
    return [];
  }
}

export async function getKeywordIds(keywordNames: string): Promise<string> {
    const individualKeywords = keywordNames.split(',').map(k => k.trim());
    const keywordIdPromises = individualKeywords.map(async (keyword) => {
        try {
            const data = await fetchFromTMDB<TMDbListResponse<TMDbKeyword>>('search/keyword', { query: keyword });
            return data.results.length > 0 ? data.results[0].id.toString() : null;
        } catch (error) {
            console.warn(`Could not find keyword ID for "${keyword}":`, error);
            return null;
        }
    });

    const keywordIds = await Promise.all(keywordIdPromises);
    return keywordIds.filter(id => id !== null).join(',');
}
