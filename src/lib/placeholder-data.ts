import type { Movie, TVShow, CastMember } from './types';

export const placeholderCast: CastMember[] = [
  { id: 'cast1', name: 'Actor One', character: 'Hero', imageUrl: 'https://placehold.co/100x150.png' },
  { id: 'cast2', name: 'Actress Two', character: 'Sidekick', imageUrl: 'https://placehold.co/100x150.png' },
  { id: 'cast3', name: 'Actor Three', character: 'Villain', imageUrl: 'https://placehold.co/100x150.png' },
];

export const placeholderMovies: Movie[] = [
  {
    id: '1',
    title: 'Cosmic Odyssey',
    posterUrl: 'https://placehold.co/400x600.png',
    bannerUrl: 'https://placehold.co/1200x400.png',
    synopsis: 'A thrilling space adventure across galaxies to save humanity from an ancient cosmic threat.',
    releaseDate: '2024-01-15',
    rating: 8.5,
    genres: ['Sci-Fi', 'Action', 'Adventure'],
    cast: placeholderCast,
    duration: '2h 20m',
  },
  {
    id: '2',
    title: 'Cyber City Nights',
    posterUrl: 'https://placehold.co/400x600.png',
    bannerUrl: 'https://placehold.co/1200x400.png',
    synopsis: 'In a dystopian future, a detective uncovers a conspiracy in the neon-lit streets of Cyber City.',
    releaseDate: '2024-03-22',
    rating: 7.9,
    genres: ['Cyberpunk', 'Thriller', 'Mystery'],
    cast: placeholderCast,
    duration: '1h 55m',
  },
  {
    id: '3',
    title: 'The Last Kingdom',
    posterUrl: 'https://placehold.co/400x600.png',
    bannerUrl: 'https://placehold.co/1200x400.png',
    synopsis: 'A medieval epic where kingdoms clash and heroes rise to defend their land from invaders.',
    releaseDate: '2023-11-10',
    rating: 9.0,
    genres: ['Fantasy', 'War', 'Drama'],
    cast: placeholderCast,
    duration: '2h 45m',
  },
  {
    id: '4',
    title: 'Deep Sea Mystery',
    posterUrl: 'https://placehold.co/400x600.png',
    bannerUrl: 'https://placehold.co/1200x400.png',
    synopsis: 'Explorers discover an ancient civilization hidden in the depths of the ocean, but they are not alone.',
    releaseDate: '2024-05-01',
    rating: 7.2,
    genres: ['Adventure', 'Horror', 'Mystery'],
    cast: placeholderCast,
    duration: '2h 05m',
  },
  {
    id: '5',
    title: 'Retro Arcade',
    posterUrl: 'https://placehold.co/400x600.png',
    bannerUrl: 'https://placehold.co/1200x400.png',
    synopsis: 'A group of friends gets trapped inside a vintage arcade game and must play to survive.',
    releaseDate: '2024-02-10',
    rating: 6.8,
    genres: ['Comedy', 'Adventure', 'Family'],
    cast: placeholderCast,
    duration: '1h 40m',
  },
   {
    id: '6',
    title: 'Galactic Guardians',
    posterUrl: 'https://placehold.co/400x600.png',
    bannerUrl: 'https://placehold.co/1200x400.png',
    synopsis: 'A band of misfits must team up to protect the galaxy from a powerful warlord.',
    releaseDate: '2024-07-19',
    rating: 8.8,
    genres: ['Sci-Fi', 'Action', 'Comedy'],
    cast: placeholderCast,
    duration: '2h 10m',
  },
  {
    id: '7',
    title: 'Neon Noir',
    posterUrl: 'https://placehold.co/400x600.png',
    bannerUrl: 'https://placehold.co/1200x400.png',
    synopsis: 'A hard-boiled detective navigates the rain-slicked, neon-drenched streets of a corrupt city.',
    releaseDate: '2024-09-06',
    rating: 7.5,
    genres: ['Neo-noir', 'Crime', 'Thriller'],
    cast: placeholderCast,
    duration: '2h 00m',
  },
  {
    id: '8',
    title: 'Chronicles of Eldoria',
    posterUrl: 'https://placehold.co/400x600.png',
    bannerUrl: 'https://placehold.co/1200x400.png',
    synopsis: 'An ancient prophecy unfolds as a young hero embarks on a quest to restore balance to a magical realm.',
    releaseDate: '2023-12-25',
    rating: 9.2,
    genres: ['Fantasy', 'Adventure', 'Epic'],
    cast: placeholderCast,
    duration: '3h 05m',
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
  return placeholderMovies.find(movie => movie.id === id);
}

export function getTVShowById(id: string): TVShow | undefined {
  return placeholderTVShows.find(show => show.id === id);
}

export function getContentById(id: string): Movie | TVShow | undefined {
  return allContent.find(content => content.id === id);
}
