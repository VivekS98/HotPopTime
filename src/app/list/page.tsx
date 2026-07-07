"use client";

import Loading from "@/components/Loading";
import MovieCard from "@/components/MovieCard";
import Pagination from "@/components/Pagination";
import { getFetchList } from "@/utils/fetchList";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const GENRE_LABELS: Record<string, string> = {
  now_playing: "Now Playing",
  popular: "Popular",
  top_rated: "Top Rated",
  upcoming: "Upcoming",
  similar: "Similar Titles",
  production: "From This Studio",
  search: "Search Results",
};

export default function Items() {
  const [list, setList] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const params = useSearchParams();
  const page = Number(params.get("page")) || 1;
  const query = params.get("query") || "";
  const genere = params.get("genere") || "";
  const id = params.get("id") || "0";
  const type = params.get("type") || "movie";

  useEffect(() => {
    setLoading(true);
    getFetchList({ items: [type, genere, id], page, query })
      .then((data) => {
        setList(data.list ?? []);
        setTotal(data.total ?? 0);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, id, page, genere, query]);

  const label =
    genere === "search"
      ? `Results for "${query}"`
      : GENRE_LABELS[genere] ?? genere.replace(/_/g, " ");

  if (loading) return <Loading />;

  if (!loading && list.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4">
        <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
          <svg className="w-10 h-10 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <div className="text-center">
          <h2 className="font-outfit font-bold text-xl text-white mb-2">Nothing Found</h2>
          <p className="text-white/40 text-sm">
            {genere === "search"
              ? `No ${type === "tv" ? "TV shows" : "movies"} found for "${query}".`
              : `No results for this category.`}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <div className="slide-up">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px w-8 bg-gold/50" />
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">
              {type === "tv" ? "TV Shows" : "Movies"}
            </span>
          </div>
          <h1 className="font-outfit font-black text-3xl sm:text-4xl text-white capitalize tracking-tight">
            {label}
          </h1>
          {total > 0 && (
            <p className="text-white/40 text-sm mt-2">
              Page {page} of {total}
            </p>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-x-4 gap-y-6">
          {list.map((movie: any, idx: number) => (
            <div
              key={`${movie?.id ?? idx}`}
              className="fade-in"
              style={{ animationDelay: `${Math.min(idx * 0.04, 0.6)}s` }}
            >
              <MovieCard movie={movie} type={type} />
            </div>
          ))}
        </div>
        <Pagination total={total} />
      </div>
    </div>
  );
}
