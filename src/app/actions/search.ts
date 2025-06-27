'use server';

import { searchMulti } from '@/lib/tmdb';
import type { Movie, TVShow } from '@/lib/types';

export async function searchContent(query: string): Promise<(Movie | TVShow)[]> {
  if (!query || query.trim().length < 2) {
    return [];
  }
  return searchMulti(query);
}
