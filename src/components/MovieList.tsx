"use client";
import { useRouter } from "next/navigation";
import MovieCard from "./MovieCard";
import { useRef } from "react";

interface Props {
  list: any[];
  type: string;
  genre: string;
  id?: string;
}

function SkeletonCard() {
  return (
    <div className="flex-shrink-0" style={{ width: "170px" }}>
      <div className="skeleton rounded-2xl" style={{ height: "255px" }} />
      <div className="mt-2.5 space-y-1.5">
        <div className="skeleton h-3 rounded-md" style={{ width: "80%" }} />
        <div className="skeleton h-2.5 rounded-md" style={{ width: "40%" }} />
      </div>
    </div>
  );
}

export default function MovieList({ list, type, genre, id }: Props) {
  const router    = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSeeAll = () => {
    if (genre === "similar") {
      router.push(`/list?type=${type}&genere=${genre}&id=${id}`);
    } else {
      router.push(`/list?type=${type}&genere=${genre}`);
    }
  };

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "right" ? 600 : -600, behavior: "smooth" });
  };

  if (list === undefined) {
    return (
      <div className="relative">
        <div className="flex gap-4 px-4 sm:px-6 lg:px-10 pb-2 overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    );
  }

  return (
    <div className="relative group/row">

      {/* ── Left scroll button ── */}
      <button
        id={`scroll-left-${genre}`}
        onClick={() => scroll("left")}
        aria-label="Scroll left"
        className="hidden lg:flex absolute left-2 top-[127px] -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full
          opacity-0 group-hover/row:opacity-100 focus:opacity-100 transition-all duration-200 scale-90 group-hover/row:scale-100"
        style={{
          background: "rgba(8,9,26,0.85)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(59,130,246,0.3)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.5), 0 0 12px rgba(59,130,246,0.2)",
        }}
      >
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7"/>
        </svg>
      </button>

      {/* ── Right scroll button ── */}
      <button
        id={`scroll-right-${genre}`}
        onClick={() => scroll("right")}
        aria-label="Scroll right"
        className="hidden lg:flex absolute right-2 top-[127px] -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full
          opacity-0 group-hover/row:opacity-100 focus:opacity-100 transition-all duration-200 scale-90 group-hover/row:scale-100"
        style={{
          background: "rgba(8,9,26,0.85)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(59,130,246,0.3)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.5), 0 0 12px rgba(59,130,246,0.2)",
        }}
      >
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7"/>
        </svg>
      </button>

      {/* ── Edge fades ── */}
      <div className="absolute left-0 top-0 bottom-0 w-10 pointer-events-none z-10"
        style={{ background: "linear-gradient(90deg, var(--bg-primary), transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-20 pointer-events-none z-10"
        style={{ background: "linear-gradient(270deg, var(--bg-primary), transparent)" }} />

      {/* ── Scrollable Row ── */}
      <div
        ref={scrollRef}
        className="scroll-row flex gap-4 px-4 sm:px-6 lg:px-10 py-3"
      >
        {list?.map((movie, idx) => (
          <MovieCard key={`${movie?.id ?? idx}`} movie={movie} type={type} />
        ))}

        {/* See All Card */}
        <div
          id={`see-all-${genre}`}
          role="button"
          tabIndex={0}
          onClick={handleSeeAll}
          onKeyDown={e => e.key === "Enter" && handleSeeAll()}
          aria-label={`See all ${genre}`}
          className="flex-shrink-0 flex flex-col items-center justify-center cursor-pointer group/all rounded-2xl transition-all duration-300 gap-3 focus:outline-none"
          style={{
            width: "170px",
            height: "255px",
            background: "rgba(59,130,246,0.05)",
            border: "1px solid rgba(59,130,246,0.15)",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.12)";
            (e.currentTarget as HTMLElement).style.border = "1px solid rgba(59,130,246,0.35)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px rgba(59,130,246,0.15)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.05)";
            (e.currentTarget as HTMLElement).style.border = "1px solid rgba(59,130,246,0.15)";
            (e.currentTarget as HTMLElement).style.boxShadow = "none";
          }}
        >
          <div className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300"
            style={{ background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.25)" }}>
            <svg className="w-6 h-6 text-accent-bright" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
            </svg>
          </div>
          <div className="text-center px-3">
            <p className="text-sm font-semibold text-accent-bright">See All</p>
            <p className="text-xs text-white/30 mt-0.5 capitalize">{genre.replace("_", " ")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
