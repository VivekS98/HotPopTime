"use client";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { searchQuery } from "../utils/api";
import Image from "next/image";

interface SearchProps {
  isMobile?: boolean;
}

export default function Search({ isMobile = false }: SearchProps) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const type = pathname.includes("/tv") ? "tv" : "movie";
  const placeholder = `Search ${type === "tv" ? "TV shows" : "movies"}…`;

  useEffect(() => {
    if (isMobile) inputRef.current?.focus();
  }, [isMobile]);

  // Debounced search queries
  useEffect(() => {
    if (query.trim().length < 2) {
      setSuggestions([]);
      return;
    }
    const delayDebounce = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await searchQuery(type, query.trim(), 1);
        setSuggestions(res.results?.slice(0, 5) || []);
      } catch (err) {
        console.error("Suggestion fetch error:", err);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(delayDebounce);
  }, [query, type]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim().length > 1) {
      router.push(
        `/list?type=${type}&genere=search&query=${encodeURIComponent(query.trim())}&page=1`
      );
      setFocused(false);
    }
  };

  const handleBlur = () => {
    // Small timeout to allow mouseDown triggers to fire on suggestions before blur hides them
    setTimeout(() => setFocused(false), 200);
  };

  return (
    <div className="relative w-full">
      <form
        id={isMobile ? "mobile-search-form" : "desktop-search-form"}
        onSubmit={handleSubmit}
        className="relative w-full"
      >
        <div
          className="flex items-center w-full rounded-full transition-all duration-300"
          style={{
            background: focused
              ? "rgba(59,130,246,0.10)"
              : "rgba(255,255,255,0.05)",
            border: `1px solid ${
              focused ? "rgba(59,130,246,0.45)" : "rgba(59,130,246,0.15)"
            }`,
            boxShadow: focused
              ? "0 0 0 3px rgba(59,130,246,0.08), 0 0 20px rgba(59,130,246,0.12)"
              : "none",
          }}
        >
          <svg
            className="flex-shrink-0 ml-3.5 w-4 h-4 transition-colors duration-200"
            style={{
              color: focused ? "rgba(96,165,250,0.9)" : "rgba(255,255,255,0.3)",
            }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>

          <input
            ref={inputRef}
            id={isMobile ? "mobile-search-input" : "desktop-search-input"}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={handleBlur}
            placeholder={placeholder}
            className="flex-1 bg-transparent text-sm text-white placeholder-white/25 outline-none px-3 py-2.5"
            autoComplete="off"
            spellCheck={false}
          />

          {query.length > 0 && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setSuggestions([]);
              }}
              className="p-1.5 mr-1 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Clear search"
            >
              <svg
                className="w-3 h-3 text-white/40"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}

          <button
            type="submit"
            id={isMobile ? "mobile-search-submit" : "desktop-search-submit"}
            aria-label="Submit search"
            className="flex-shrink-0 mr-1 p-1.5 rounded-full transition-all duration-200"
            style={{
              background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
              boxShadow: "0 0 10px rgba(59,130,246,0.3)",
            }}
          >
            <svg
              className="w-3.5 h-3.5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </form>

      {/* Suggestion Dropdown */}
      {focused && (suggestions.length > 0 || loading) && (
        <div
          className="absolute top-full left-0 right-0 mt-2 rounded-2xl glass z-50 overflow-hidden shadow-card p-1"
          style={{ background: "rgba(12, 14, 34, 0.95)", backdropFilter: "blur(20px)" }}
        >
          {loading && (
            <div className="p-3 text-xs text-white/40 text-center animate-pulse flex items-center justify-center gap-2">
              <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-accent-blue rounded-full animate-spin" />
              Searching Suggestions...
            </div>
          )}
          {!loading &&
            suggestions.map((item) => {
              const date = item.release_date || item.first_air_date;
              const year = date ? new Date(date).getFullYear() : null;
              return (
                <div
                  key={item.id}
                  onMouseDown={() => {
                    router.push(`/info?type=${type}&id=${item.id}`);
                    setQuery("");
                    setSuggestions([]);
                  }}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 cursor-pointer transition-colors"
                >
                  <div className="relative w-8 h-12 rounded overflow-hidden flex-shrink-0 bg-white/5">
                    {item.poster_path ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="32px"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-white/5 flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white/20"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M18 3v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2h2V3h-2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-white/90 truncate leading-tight">
                      {item.title || item.name}
                    </p>
                    <p className="text-xs text-white/40 mt-0.5">
                      {year ? year : "Unknown Year"} • ★{" "}
                      {item.vote_average?.toFixed(1) || "0.0"}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
