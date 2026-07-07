"use client";

import Image from "next/image";
import MovieList from "../components/MovieList";
import { fetchList } from "../utils/api";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const SECTIONS = [
  { key: "nowPlaying", label: "Now Playing",  genre: "now_playing", movieOnly: true,  icon: "🎬", color: "from-blue-500/20" },
  { key: "popular",    label: "Popular",       genre: "popular",     movieOnly: false, icon: "🔥", color: "from-orange-500/20" },
  { key: "topRated",   label: "Top Rated",     genre: "top_rated",   movieOnly: false, icon: "⭐", color: "from-yellow-500/20" },
  { key: "upcoming",   label: "Upcoming",      genre: "upcoming",    movieOnly: true,  icon: "🚀", color: "from-purple-500/20" },
];

function HeroSkeleton() {
  return (
    <div className="relative w-full overflow-hidden" style={{ height: "480px" }}>
      <div className="skeleton absolute inset-0 rounded-none" />
    </div>
  );
}

export default function Home() {
  const [lists, setLists] = useState<Record<string, any[]>>({});
  const [hero, setHero]   = useState<any>(null);
  const params = useSearchParams();
  const router = useRouter();
  const type   = params.get("type");
  const isTV   = type === "tv";

  useEffect(() => {
    const mediaType = isTV ? "tv" : "movie";
    setLists({});
    setHero(null);

    async function loadAll() {
      const [nowPlaying, popular, topRated, upcoming] = await Promise.all([
        fetchList(mediaType, "now_playing"),
        fetchList(mediaType, "popular"),
        fetchList(mediaType, "top_rated"),
        fetchList(mediaType, "upcoming"),
      ]);
      const nowResults = nowPlaying.results ?? [];
      const popResults = popular.results ?? [];
      setLists({
        nowPlaying: nowResults,
        popular:    popResults,
        topRated:   topRated.results  ?? [],
        upcoming:   upcoming.results  ?? [],
      });
      // Pick a high-rated featured item from popular
      const candidates = [...popResults].filter(m => m.backdrop_path && (m.vote_average ?? 0) > 7);
      if (candidates.length) setHero(candidates[Math.floor(Math.random() * Math.min(candidates.length, 5))]);
    }
    void loadAll();
  }, [type, isTV]);

  const visibleSections = SECTIONS.filter(s => !s.movieOnly || !isTV);
  const heroTitle = hero?.title || hero?.name;
  const heroRating = hero?.vote_average;

  return (
    <div>
      {/* ════════════════════════════════════════
          HERO BANNER
      ════════════════════════════════════════ */}
      <section id="hero-banner" className="relative overflow-hidden" style={{ height: "500px" }}>
        {/* Backdrop image */}
        {hero ? (
          <Image
            src={`https://image.tmdb.org/t/p/original${hero.backdrop_path}`}
            alt={heroTitle}
            fill
            priority
            className="object-cover object-top transition-opacity duration-700"
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 skeleton" />
        )}

        {/* Gradient layers */}
        <div className="absolute inset-0 bg-gradient-to-r from-bg-primary via-bg-primary/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-bg-primary/40" />

        {/* Animated spotlight orb */}
        <div className="hero-spotlight top-1/2 left-1/3 -translate-y-1/2" />

        {/* Content */}
        <div className="relative z-10 h-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 flex flex-col justify-end pb-12">
          {hero ? (
            <div className="slide-up max-w-xl">
              {/* Mode badge */}
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest"
                  style={{ background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.35)", color: "#93c5fd" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse inline-block" />
                  {isTV ? "TV Show" : "Movie"}
                </span>
                {heroRating != null && heroRating > 0 && (
                  <div className="rating-badge">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    {heroRating.toFixed(1)}
                  </div>
                )}
              </div>

              <h1 className="font-outfit font-black text-4xl sm:text-5xl leading-tight tracking-tight text-white mb-3 drop-shadow-2xl">
                {heroTitle}
              </h1>
              {hero.overview && (
                <p className="text-white/60 text-sm sm:text-base leading-relaxed line-clamp-2 mb-6 max-w-md">
                  {hero.overview}
                </p>
              )}

              {/* CTA */}
              <button
                id="hero-view-btn"
                onClick={() => router.push(`/info?type=${isTV ? "tv" : "movie"}&id=${hero.id}`)}
                className="btn-blue inline-flex items-center gap-2 px-6 py-2.5 text-sm"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                View Details
              </button>
            </div>
          ) : (
            <div className="max-w-xl space-y-4">
              <div className="skeleton h-4 w-24 rounded-full" />
              <div className="skeleton h-10 w-64 rounded-xl" />
              <div className="skeleton h-3 w-80 rounded" />
              <div className="skeleton h-3 w-56 rounded" />
              <div className="skeleton h-10 w-32 rounded-full mt-2" />
            </div>
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════
          QUICK TOGGLE BAR
      ════════════════════════════════════════ */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 mt-8 mb-10">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* Left: heading */}
          <div>
            <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-1">Browse</p>
            <h2 className="font-outfit font-black text-2xl sm:text-3xl text-white tracking-tight">
              {isTV ? (
                <><span className="blue-text">TV Shows</span> for you</>
              ) : (
                <><span className="gold-text">Movies</span> for you</>
              )}
            </h2>
          </div>

          {/* Right: mode pills */}
          <div className="flex items-center rounded-full p-1 gap-0.5"
            style={{ background: "rgba(59,130,246,0.07)", border: "1px solid rgba(59,130,246,0.14)" }}>
            <button
              id="home-movies-pill"
              onClick={() => router.push("/")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                !isTV
                  ? "bg-gold-gradient text-bg-primary shadow-gold-sm"
                  : "text-white/50 hover:text-white"
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 3v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2h2V3h-2zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm10 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z"/>
              </svg>
              Movies
            </button>
            <button
              id="home-tv-pill"
              onClick={() => router.push("/?type=tv")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                isTV
                  ? "bg-blue-gradient text-white shadow-blue-sm"
                  : "text-white/50 hover:text-white"
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z"/>
              </svg>
              TV Shows
            </button>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════
          CONTENT SECTIONS
      ════════════════════════════════════════ */}
      <div className="space-y-14 pb-16">
        {visibleSections.map((section, idx) => (
          <section
            key={section.key}
            id={`section-${section.genre}`}
            className="fade-in"
            style={{ animationDelay: `${idx * 0.12}s` }}
          >
            {/* Section Header */}
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 mb-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-9 h-9 rounded-xl text-lg"
                    style={{ background: "rgba(59,130,246,0.10)", border: "1px solid rgba(59,130,246,0.20)" }}>
                    {section.icon}
                  </div>
                  <div>
                    <h3 className="font-outfit font-bold text-xl sm:text-2xl text-white leading-none">
                      {section.label}
                    </h3>
                    <div className="section-line w-32 mt-1.5" />
                  </div>
                </div>

                <button
                  id={`section-see-all-${section.genre}`}
                  onClick={() => router.push(`/list?type=${isTV ? "tv" : "movie"}&genere=${section.genre}`)}
                  className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-accent-bright hover:text-blue-300 transition-colors group"
                >
                  See all
                  <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Row */}
            <MovieList
              list={lists[section.key]}
              type={isTV ? "tv" : "movie"}
              genre={section.genre}
            />
          </section>
        ))}
      </div>
    </div>
  );
}
