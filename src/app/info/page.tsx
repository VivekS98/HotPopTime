"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import MovieList from "@/components/MovieList";
import Search from "@/components/Search";
import { fetchDetails, fetchSimilarList, fetchCredits, fetchVideos } from "@/utils/api";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "@/components/Loading";
import Link from "next/link";
import { isInWatchlist, toggleWatchlist } from "@/utils/watchlist";

/* ─────────────────────────────────
   Production companies
───────────────────────────────── */
function Production({ data, type }: { data: any[]; type: string }) {
  const router = useRouter();
  return (
    <div className="flex flex-wrap gap-3 mt-4">
      {data?.filter(c => c.logo_path).map((company, idx) => (
        <button
          key={idx}
          id={`production-${company.id}`}
          onClick={() => router.push(`/list?type=${type}&genere=production&id=${company.id}`)}
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group"
          style={{
            background: "rgba(59,130,246,0.06)",
            border: "1px solid rgba(59,130,246,0.15)",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.14)";
            (e.currentTarget as HTMLElement).style.border = "1px solid rgba(59,130,246,0.35)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.06)";
            (e.currentTarget as HTMLElement).style.border = "1px solid rgba(59,130,246,0.15)";
          }}
          aria-label={`Browse ${company.name}`}
        >
          <div className="relative w-16 h-8 flex-shrink-0">
            <Image
              src={`https://image.tmdb.org/t/p/w92${company.logo_path}`}
              alt={company.name}
              fill
              className="object-contain brightness-75 group-hover:brightness-100 transition-all duration-200"
              sizes="64px"
            />
          </div>
          <div className="text-left">
            <p className="text-xs font-semibold text-white/60 group-hover:text-white transition-colors leading-none">
              {company.name}
            </p>
            {company.origin_country && (
              <p className="text-xs text-white/25 mt-0.5">{company.origin_country}</p>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}

/* ─────────────────────────────────
   Stat item
───────────────────────────────── */
function Stat({ label, value }: { label: string; value?: string | number | null }) {
  if (!value) return null;
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(96,165,250,0.7)" }}>
        {label}
      </span>
      <span className="text-sm font-semibold text-white/80 leading-tight">{value}</span>
    </div>
  );
}

/* ─────────────────────────────────
   Main Page
───────────────────────────────── */
export default function Show() {
  const [data,    setData]    = useState<any>({});
  const [similar, setSimilar] = useState<any>({});
  const [cast,    setCast]    = useState<any[]>([]);
  const [videos,  setVideos]  = useState<any[]>([]);
  const [scrolled, setScrolled] = useState(false);

  // Watchlist & Favorites Local State
  const [inWatchlist, setInWatchlist] = useState(false);
  const [inFavorites, setInFavorites] = useState(false);
  const [trailerOpen, setTrailerOpen] = useState(false);

  const router = useRouter();
  const params = useSearchParams();
  const id   = params.get("id")   || "0";
  const type = params.get("type") || "movie";
  const isTV = type === "tv";

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    setData({});
    setSimilar({});
    setCast([]);
    setVideos([]);
    
    fetchDetails(type, id)
      .then(res => {
        setData(res);
        document.title = `${res?.title || res?.name} · HotPopTime`;
      })
      .catch(console.error);

    fetchSimilarList(type, id).then(setSimilar).catch(console.error);
    
    fetchCredits(type, id)
      .then(res => setCast(res.cast?.slice(0, 12) || []))
      .catch(console.error);
      
    fetchVideos(type, id)
      .then(res => setVideos(res.results || []))
      .catch(console.error);
  }, [type, id]);

  // Sync Library states
  useEffect(() => {
    if (data?.id) {
      setInWatchlist(isInWatchlist(data.id, type as "movie" | "tv", "watchlist"));
      setInFavorites(isInWatchlist(data.id, type as "movie" | "tv", "favorites"));
    }
  }, [data, type]);

  const handleLibraryToggle = (key: "watchlist" | "favorites") => {
    if (!data.id) return;
    const item = {
      id: data.id,
      title: data.title || data.name,
      poster_path: data.poster_path,
      type: type as "movie" | "tv",
      vote_average: data.vote_average,
      release_date: data.release_date || data.first_air_date,
    };
    const nextState = toggleWatchlist(item, key);
    if (key === "watchlist") setInWatchlist(nextState);
    if (key === "favorites") setInFavorites(nextState);
  };

  const title    = data?.title || data?.name;
  const date     = data?.release_date || data?.first_air_date;
  const year     = date ? new Date(date).getFullYear() : null;
  const rating   = data?.vote_average;
  const runtime  = data?.runtime;
  const seasons  = data?.number_of_seasons;
  const episodes = data?.number_of_episodes;

  // Filter YouTube trailers
  const officialTrailer = videos.find(
    v => (v.type === "Trailer" || v.type === "Teaser") && v.site === "YouTube"
  );

  if (!data?.id) return <Loading />;

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>

      {/* ══════════════════════════════════════
          STICKY TOP BAR
      ══════════════════════════════════════ */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? "glass-nav py-3" : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" id="info-logo" className="flex items-center gap-2 group flex-shrink-0">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #f5c518, #d4a017)" }}>
              <svg className="w-4 h-4" fill="currentColor" style={{ color: "var(--bg-primary)" }} viewBox="0 0 24 24">
                <path d="M18 3v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2h2V3h-2z"/>
              </svg>
            </div>
            <span className="font-outfit font-black text-lg hidden sm:block gold-text">HOTPOPTIME</span>
          </Link>

          {/* Search — desktop */}
          <div className="hidden md:flex flex-1 max-w-sm">
            <Search />
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              id="info-back"
              onClick={() => router.back()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium btn-ghost"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
              </svg>
              <span className="hidden sm:inline">Back</span>
            </button>
            <button
              id="info-mode-toggle"
              onClick={() => router.push(isTV ? "/" : "/?type=tv")}
              className="px-3 py-1.5 rounded-full text-sm font-medium btn-ghost text-accent-bright"
            >
              {isTV ? "Movies" : "TV"}
            </button>
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════
          BACKDROP IMAGE
      ══════════════════════════════════════ */}
      <div className="relative w-full" style={{ height: "60vh", maxHeight: "600px" }}>
        {data.backdrop_path && (
          <Image
            src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
            alt={title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-top"
          />
        )}
        {/* Gradient overlays */}
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to right, var(--bg-primary) 10%, rgba(8,9,26,0.6) 50%, rgba(8,9,26,0.3) 100%)" }} />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to top, var(--bg-primary) 0%, rgba(8,9,26,0.3) 40%, transparent 80%)" }} />
        {/* Blue vignette */}
        <div className="absolute inset-0 opacity-30"
          style={{ background: "radial-gradient(ellipse 80% 60% at 20% 50%, rgba(59,130,246,0.12), transparent)" }} />
      </div>

      {/* ══════════════════════════════════════
          MAIN CONTENT
      ══════════════════════════════════════ */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 -mt-64 relative z-10 pb-20">

        <div className="flex flex-col sm:flex-row gap-6 lg:gap-10 items-start">

          {/* ── Poster & Action Buttons ── */}
          <div className="flex-shrink-0 mx-auto sm:mx-0" style={{ width: "220px" }}>
            <div className="relative rounded-3xl overflow-hidden slide-up poster-glow"
              style={{ height: "330px" }}>
              {data.poster_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w342${data.poster_path}`}
                  alt={title}
                  fill
                  priority
                  sizes="220px"
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center"
                  style={{ background: "var(--bg-card)" }}>
                  <svg className="w-16 h-16 opacity-15" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 3v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2h2V3h-2z"/>
                  </svg>
                </div>
              )}
            </div>

            {/* Rating pill below poster */}
            {rating != null && rating > 0 && (
              <div className="mt-3 flex items-center justify-center">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full"
                  style={{ background: "rgba(245,197,24,0.10)", border: "1px solid rgba(245,197,24,0.28)" }}>
                  <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <span className="text-gold font-bold text-lg">{rating.toFixed(1)}</span>
                  {data.vote_count && (
                    <span className="text-white/30 text-xs">/ 10</span>
                  )}
                </div>
              </div>
            )}

            {/* Watchlist & Favorites Toggles */}
            <div className="mt-4 flex flex-col gap-2">
              <button
                id="details-watchlist-btn"
                onClick={() => handleLibraryToggle("watchlist")}
                className={`w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                  inWatchlist
                    ? "bg-gradient-to-r from-accent-blue to-blue-600 text-white shadow-blue-sm"
                    : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {inWatchlist ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  )}
                </svg>
                {inWatchlist ? "In Watchlist" : "Add to Watchlist"}
              </button>

              <button
                id="details-favorite-btn"
                onClick={() => handleLibraryToggle("favorites")}
                className={`w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                  inFavorites
                    ? "bg-gradient-to-r from-gold-DEFAULT to-gold-dim text-bg-primary shadow-gold-sm"
                    : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <svg className="w-4 h-4" fill={inFavorites ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {inFavorites ? "Favorited" : "Favorite"}
              </button>
            </div>
          </div>

          {/* ── Details ── */}
          <div className="flex-1 min-w-0 slide-up" style={{ animationDelay: "0.1s" }}>

            {/* Type badge */}
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest"
                style={{ background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.3)", color: "#93c5fd" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-accent-blue inline-block" />
                {isTV ? "TV Show" : "Film"}
              </span>
              {year && (
                <span className="text-white/40 text-sm font-medium">{year}</span>
              )}
            </div>

            {/* Title */}
            <h1 className="font-outfit font-black text-3xl sm:text-4xl lg:text-5xl text-white leading-tight tracking-tight mb-2">
              {title}
            </h1>

            {/* Tagline */}
            {data.tagline && (
              <p className="italic text-accent-bright/70 text-sm sm:text-base mb-4">
                &ldquo;{data.tagline}&rdquo;
              </p>
            )}

            {/* Quick Pill Stats */}
            <div className="flex flex-wrap items-center gap-2 mb-5">
              {runtime && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold text-white/60"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  {Math.floor(runtime / 60)}h {runtime % 60}m
                </span>
              )}
              {seasons && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold text-white/60"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  {seasons} Season{seasons !== 1 ? "s" : ""}
                </span>
              )}
              {episodes && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold text-white/60"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  {episodes} Episodes
                </span>
              )}
              {data.status && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold"
                  style={{
                    background: data.status === "Released" || data.status === "Ended"
                      ? "rgba(34,197,94,0.12)" : "rgba(59,130,246,0.12)",
                    border: data.status === "Released" || data.status === "Ended"
                      ? "1px solid rgba(34,197,94,0.3)" : "1px solid rgba(59,130,246,0.3)",
                    color: data.status === "Released" || data.status === "Ended" ? "#86efac" : "#93c5fd",
                  }}>
                  {data.status}
                </span>
              )}

              {/* Play Trailer CTA */}
              {officialTrailer && (
                <button
                  id="details-trailer-btn"
                  onClick={() => setTrailerOpen(true)}
                  className="px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all duration-200"
                  style={{
                    background: "rgba(245,197,24,0.15)",
                    border: "1px solid rgba(245,197,24,0.35)",
                    color: "#f5c518",
                  }}
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Watch Trailer
                </button>
              )}
            </div>

            {/* Genre tags */}
            {data.genres?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {data.genres.map((g: any) => (
                  <span key={g.id} className="genre-tag">{g.name}</span>
                ))}
              </div>
            )}

            {/* Stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 mb-6 p-5 rounded-2xl"
              style={{ background: "rgba(59,130,246,0.04)", border: "1px solid rgba(59,130,246,0.10)" }}>
              <Stat label="Released"  value={date} />
              <Stat label="Language"  value={data.spoken_languages?.slice(0,3).map((l:any) => l.english_name).join(", ")} />
              {data.vote_count && <Stat label="Votes"   value={data.vote_count?.toLocaleString()} />}
              {data.budget  > 0 && <Stat label="Budget"  value={`$${(data.budget/1e6).toFixed(0)}M`} />}
              {data.revenue > 0 && <Stat label="Revenue" value={`$${(data.revenue/1e6).toFixed(0)}M`} />}
              {data.origin_country?.length > 0 && <Stat label="Country" value={data.origin_country?.join(", ")} />}
            </div>

            {/* Overview */}
            {data.overview && (
              <div className="mb-2">
                <h2 className="text-xs font-bold uppercase tracking-widest mb-3"
                  style={{ color: "rgba(96,165,250,0.7)" }}>
                  Overview
                </h2>
                <p className="text-white/70 text-base leading-relaxed max-w-2xl">
                  {data.overview}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ══ Top Cast Credits ══ */}
        {cast.length > 0 && (
          <div className="mt-14 fade-in" style={{ animationDelay: "0.15s" }}>
            <h2 className="font-outfit font-bold text-xl text-white">Top Cast</h2>
            <div className="section-line w-20 mb-6" />
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
              {cast.map((item) => (
                <div
                  key={item.id}
                  className="flex-shrink-0 w-28 text-center bg-white/3 border border-white/5 rounded-2xl p-2.5"
                >
                  <div className="relative w-20 h-20 rounded-full overflow-hidden mx-auto mb-2 bg-white/5 border border-white/10">
                    {item.profile_path ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/w185${item.profile_path}`}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-white/5 flex items-center justify-center">
                        <svg className="w-8 h-8 text-white/25" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <p className="text-xs font-bold text-white/90 truncate leading-tight">{item.name}</p>
                  <p className="text-[10px] text-white/40 truncate leading-normal mt-0.5">{item.character}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ Production ══ */}
        {data.production_companies?.some((c:any) => c.logo_path) && (
          <div className="mt-14 fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="font-outfit font-bold text-xl text-white">Production</h2>
            </div>
            <div className="section-line w-24 mb-4" />
            <Production data={data.production_companies} type={type} />
          </div>
        )}

        {/* ══ Similar ══ */}
        {similar?.results?.length > 0 && (
          <div className="mt-16 fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-xl">🎞️</span>
              <h2 className="font-outfit font-bold text-xl sm:text-2xl text-white">
                You Might Also Like
              </h2>
            </div>
            <div className="section-line w-44 mb-6" />
            <div className="-mx-4 sm:-mx-6 lg:-mx-10">
              <MovieList
                list={similar.results}
                type={type}
                genre="similar"
                id={String(data.id)}
              />
            </div>
          </div>
        )}
      </div>

      {/* ══ Trailer Lightbox Modal ══ */}
      {trailerOpen && officialTrailer && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-300"
            onClick={() => setTrailerOpen(false)}
          />
          {/* Content */}
          <div className="relative w-full max-w-4xl aspect-video rounded-3xl overflow-hidden z-10 border border-white/10 shadow-blue shadow-2xl bg-black">
            <button
              onClick={() => setTrailerOpen(false)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-all border border-white/10"
              aria-label="Close trailer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${officialTrailer.key}?autoplay=1`}
              title="Official Trailer"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}
