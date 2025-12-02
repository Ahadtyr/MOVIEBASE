
'use client';

import { useEffect, useState } from 'react';
import type { Movie, TVShow } from '@/lib/types';
import MovieSection from '@/components/movie/MovieSection';
import { getItemsByIds } from '@/lib/tmdb';

interface WatchProgress {
    id: number;
    type: 'movie' | 'tv';
    progress: number; // Percentage
    timestamp: number;
}

export default function ContinueWatching() {
  const [watchingItems, setWatchingItems] = useState<(Movie | TVShow)[]>([]);
  const [progressMap, setProgressMap] = useState<Map<number, number>>(new Map());

  useEffect(() => {
    const fetchWatchingHistory = async () => {
      try {
        const historyString = localStorage.getItem('watchProgress');
        if (!historyString) return;

        const history: WatchProgress[] = JSON.parse(historyString);
        
        const recentHistory = history
          .sort((a, b) => b.timestamp - a.timestamp)
          .filter(item => item.progress > 5 && item.progress < 95);
        
        if (recentHistory.length === 0) return;

        const itemIdsToFetch = recentHistory.map(({ id, type }) => ({ id, type }));
        
        const fetchedItems = await getItemsByIds(itemIdsToFetch);
        
        const progressMapping = new Map<number, number>();
        recentHistory.forEach(item => {
          progressMapping.set(item.id, item.progress);
        });

        // Maintain the order from recentHistory
        const sortedFetchedItems = itemIdsToFetch.map(idInfo => 
          fetchedItems.find(item => item.id === idInfo.id)
        ).filter((item): item is Movie | TVShow => !!item);

        setWatchingItems(sortedFetchedItems);
        setProgressMap(progressMapping);
      } catch (error) {
        console.error('Failed to fetch continue watching items:', error);
      }
    };

    fetchWatchingHistory();
  }, []);

  if (watchingItems.length === 0) {
    return null;
  }
  
  // Attach progress to each item before passing to MovieSection
  const itemsWithProgress = watchingItems.map(item => ({
    ...item,
    progress: progressMap.get(item.id),
  }));

  return <MovieSection title="Continue Watching ▶️" items={itemsWithProgress} />;
}
