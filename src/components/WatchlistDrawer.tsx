"use client";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getWatchlist, toggleWatchlist, WatchlistItem } from "@/utils/watchlist";

interface WatchlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WatchlistDrawer({ isOpen, onClose }: WatchlistDrawerProps) {
  const [activeTab, setActiveTab] = useState<"watchlist" | "favorites">("watchlist");
  const [items, setItems] = useState<WatchlistItem[]>([]);
  const router = useRouter();

  const loadItems = useCallback(() => {
    setItems(getWatchlist(activeTab));
  }, [activeTab]);

  useEffect(() => {
    if (isOpen) {
      loadItems();
    }
    // Listen to local changes
    const eventName = `hotpop_update_${activeTab}`;
    window.addEventListener(eventName, loadItems);
    return () => window.removeEventListener(eventName, loadItems);
  }, [isOpen, activeTab, loadItems]);

  const handleRemove = (e: React.MouseEvent, item: WatchlistItem) => {
    e.stopPropagation();
    toggleWatchlist(item, activeTab);
  };

  const handleItemClick = (item: WatchlistItem) => {
    router.push(`/info?type=${item.type}&id=${item.id}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Slide-over panel */}
      <div
        className="relative w-full max-w-md h-full flex flex-col z-10 glass border-l border-white/10"
        style={{ background: "rgba(12, 14, 34, 0.95)", backdropFilter: "blur(24px)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/5">
          <h2 className="font-outfit font-black text-xl text-white">Your library</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors"
            aria-label="Close library"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex p-2 gap-1 border-b border-white/5 bg-white/3">
          <button
            onClick={() => setActiveTab("watchlist")}
            className={`flex-1 py-2 text-center text-sm font-bold rounded-xl transition-all duration-300 ${
              activeTab === "watchlist"
                ? "bg-gradient-to-r from-accent-blue to-blue-600 text-white shadow-blue-sm"
                : "text-white/40 hover:text-white/60"
            }`}
          >
            Watchlist
          </button>
          <button
            onClick={() => setActiveTab("favorites")}
            className={`flex-1 py-2 text-center text-sm font-bold rounded-xl transition-all duration-300 ${
              activeTab === "favorites"
                ? "bg-gradient-to-r from-gold-DEFAULT to-gold-dim text-bg-primary shadow-gold-sm"
                : "text-white/40 hover:text-white/60"
            }`}
          >
            Favorites
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-white/40">
              <svg className="w-12 h-12 mb-3 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              <p className="text-sm font-medium">Your {activeTab} is empty.</p>
              <p className="text-xs mt-1">Add items to view them here.</p>
            </div>
          ) : (
            items.map((item) => {
              const year = item.release_date ? new Date(item.release_date).getFullYear() : null;
              return (
                <div
                  key={`${item.type}-${item.id}`}
                  onClick={() => handleItemClick(item)}
                  className="flex items-center gap-3.5 p-2 rounded-2xl bg-white/3 border border-white/5 hover:bg-white/5 hover:border-white/10 cursor-pointer transition-all duration-300 group"
                >
                  <div className="relative w-12 h-16 rounded-xl overflow-hidden bg-white/5 flex-shrink-0">
                    {item.poster_path ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-white/5 flex items-center justify-center">
                        <svg className="w-5 h-5 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18 3v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2h2V3h-2z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <span
                      className="inline-block text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full mb-1"
                      style={{
                        background:
                          item.type === "tv" ? "rgba(59,130,246,0.12)" : "rgba(245,197,24,0.12)",
                        color: item.type === "tv" ? "#93c5fd" : "#fde68a",
                      }}
                    >
                      {item.type === "tv" ? "TV Show" : "Movie"}
                    </span>
                    <h3 className="text-sm font-semibold text-white/90 truncate leading-tight group-hover:text-accent-bright transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-white/35 mt-0.5">
                      {year ? year : "N/A"} • ★ {item.vote_average?.toFixed(1) || "N/A"}
                    </p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={(e) => handleRemove(e, item)}
                    className="p-2 rounded-full bg-white/5 hover:bg-red-500/10 text-white/30 hover:text-red-400 transition-all duration-300"
                    aria-label="Remove item"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
