import type { Movie, TVShow, CastMember, TMDBCastMember } from './types';

// This is a placeholder for TMDb-style cast members.
// Note: The structure differs from the original placeholder `CastMember`.
export const placeholderTMDBCast: TMDBCastMember[] = [
  { id: 1, name: 'Actor One', character: 'Hero', profile_path: null },
  { id: 2, name: 'Actress Two', character: 'Sidekick', profile_path: null },
  { id: 3, name: 'Actor Three', character: 'Villain', profile_path: null },
];

// This is the original placeholder `CastMember` type, still used by placeholder `TVShow`.
export const placeholderCast: CastMember[] = [
  { id: 'cast1', name: 'Actor One', character: 'Hero', imageUrl: 'https://placehold.co/100x150.png' },
  { id: 'cast2', name: 'Actress Two', character: 'Sidekick', imageUrl: 'https://placehold.co/100x150.png' },
  { id: 'cast3', name: 'Actor Three', character: 'Villain', imageUrl: 'https://placehold.co/100x150.png' },
];


export const placeholderMovies: Movie[] = [
  {
    id: 1,
    title: 'Cosmic Odyssey',
    poster_path: null,
    backdrop_path: null,
    overview: 'A thrilling space adventure across galaxies to save humanity from an ancient cosmic threat.',
    release_date: '2024-01-15',
    vote_average: 8.5,
    genres: [{id: 878, name: 'Sci-Fi'}, {id: 28, name: 'Action'}, {id: 12, name: 'Adventure'}],
    runtime: 140,
    credits: { cast: placeholderTMDBCast }
  },
  {
    id: 2,
    title: 'Cyber City Nights',
    poster_path: null,
    backdrop_path: null,
    overview: 'In a dystopian future, a detective uncovers a conspiracy in the neon-lit streets of Cyber City.',
    release_date: '2024-03-22',
    vote_average: 7.9,
    genres: [{id: 10752, name: 'Cyberpunk'}, {id: 53, name: 'Thriller'}, {id: 9648, name: 'Mystery'}],
    runtime: 115,
  },
  {
    id: 3,
    title: 'The Last Kingdom',
    poster_path: null,
    backdrop_path: null,
    overview: 'A medieval epic where kingdoms clash and heroes rise to defend their land from invaders.',
    release_date: '2023-11-10',
    vote_average: 9.0,
    genres: [{id: 14, name: 'Fantasy'}, {id: 10752, name: 'War'}, {id: 18, name: 'Drama'}],
    runtime: 165,
  },
  {
    id: 4,
    title: 'Deep Sea Mystery',
    poster_path: null,
    backdrop_path: null,
    overview: 'Explorers discover an ancient civilization hidden in the depths of the ocean, but they are not alone.',
    release_date: '2024-05-01',
    vote_average: 7.2,
    genres: [{id: 12, name: 'Adventure'}, {id: 27, name: 'Horror'}, {id: 9648, name: 'Mystery'}],
    runtime: 125,
  },
  {
    id: 5,
    title: 'Retro Arcade',
    poster_path: null,
    backdrop_path: null,
    overview: 'A group of friends gets trapped inside a vintage arcade game and must play to survive.',
    release_date: '2024-02-10',
    vote_average: 6.8,
    genres: [{id: 35, name: 'Comedy'}, {id: 12, name: 'Adventure'}, {id: 10751, name: 'Family'}],
    runtime: 100,
  },
   {
    id: 6,
    title: 'Galactic Guardians',
    poster_path: null,
    backdrop_path: null,
    overview: 'A band of misfits must team up to protect the galaxy from a powerful warlord.',
    release_date: '2024-07-19',
    vote_average: 8.8,
    genres: [{id: 878, name: 'Sci-Fi'}, {id: 28, name: 'Action'}, {id: 35, name: 'Comedy'}],
    runtime: 130,
  },
  {
    id: 7,
    title: 'Neon Noir',
    poster_path: null,
    backdrop_path: null,
    overview: 'A hard-boiled detective navigates the rain-slicked, neon-drenched streets of a corrupt city.',
    release_date: '2024-09-06',
    vote_average: 7.5,
    genres: [{id: 80, name: 'Crime'}, {id: 53, name: 'Thriller'}],
    runtime: 120,
  },
  {
    id: 8,
    title: 'Chronicles of Eldoria',
    poster_path: null,
    backdrop_path: null,
    overview: 'An ancient prophecy unfolds as a young hero embarks on a quest to restore balance to a magical realm.',
    release_date: '2023-12-25',
    vote_average: 9.2,
    genres: [{id: 14, name: 'Fantasy'}, {id: 12, name: 'Adventure'}],
    runtime: 185,
  }
];

export const placeholderTVShows: TVShow[] = [
  {
    id: 'tv1',
    title: 'Space Cadets',
    posterUrl: 'https://placehold.co/400x600.png',
    bannerUrl: 'https://placehold.co/1200x400.png',
    synopsis: 'A group of young trainees at a prestigious space academy uncover a galactic conspiracy.',
    releaseDate: '2024-04-10',
    rating: 8.2,
    genres: ['Sci-Fi', 'Teen', 'Drama'],
    cast: placeholderCast,
    seasons: 2,
    episodes: 20,
  },
  {
    id: 'tv2',
    title: 'The Algorithm',
    posterUrl: 'https://placehold.co/400x600.png',
    bannerUrl: 'https://placehold.co/1200x400.png',
    synopsis: 'A brilliant but reclusive programmer creates an AI that begins to control global events.',
    releaseDate: '2024-06-05',
    rating: 8.9,
    genres: ['Tech-Thriller', 'Drama', 'Suspense'],
    cast: placeholderCast,
    seasons: 1,
    episodes: 8,
  },
];

export const placeholderGenres: string[] = [
  'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Cyberpunk', 'Documentary', 'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music', 'Mystery', 'Neo-noir', 'Romance', 'Sci-Fi', 'Sport', 'Superhero', 'Thriller', 'War', 'Western'
];

export const allContent: (Movie | TVShow)[] = [...placeholderMovies, ...placeholderTVShows];

export function getMovieById(id: string): Movie | undefined {
  // ID for placeholder movies is a number, but route param is a string
  return placeholderMovies.find(movie => movie.id.toString() === id);
}

export function getTVShowById(id: string): TVShow | undefined {
  return placeholderTVShows.find(show => show.id === id);
}

export function getContentById(id: string): Movie | TVShow | undefined {
  return allContent.find(content => content.id.toString() === id);
}
