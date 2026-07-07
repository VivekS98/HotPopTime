export interface WatchlistItem {
  id: number;
  title: string;
  poster_path: string | null;
  type: "movie" | "tv";
  vote_average?: number;
  release_date?: string;
}

export function getWatchlist(key: "watchlist" | "favorites" = "watchlist"): WatchlistItem[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(`hotpop_${key}`);
  try {
    return stored ? JSON.parse(stored) : [];
  } catch (err) {
    console.error("Failed to parse watchlist:", err);
    return [];
  }
}

export function saveWatchlist(
  items: WatchlistItem[],
  key: "watchlist" | "favorites" = "watchlist"
) {
  if (typeof window === "undefined") return;
  localStorage.setItem(`hotpop_${key}`, JSON.stringify(items));
  // Dispatch a custom event to notify other components of updates
  window.dispatchEvent(new Event(`hotpop_update_${key}`));
}

export function toggleWatchlist(
  item: WatchlistItem,
  key: "watchlist" | "favorites" = "watchlist"
): boolean {
  const current = getWatchlist(key);
  const exists = current.some((i) => i.id === item.id && i.type === item.type);
  let next: WatchlistItem[];
  if (exists) {
    next = current.filter((i) => !(i.id === item.id && i.type === item.type));
  } else {
    next = [...current, item];
  }
  saveWatchlist(next, key);
  return !exists;
}

export function isInWatchlist(
  id: number,
  type: "movie" | "tv",
  key: "watchlist" | "favorites" = "watchlist"
): boolean {
  const current = getWatchlist(key);
  return current.some((i) => i.id === id && i.type === type);
}
