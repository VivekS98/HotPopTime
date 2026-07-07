"use client";
import { ReactNode, useEffect, useState, useCallback } from "react";
import Search from "./Search";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import WatchlistDrawer from "./WatchlistDrawer";
import { getWatchlist } from "@/utils/watchlist";

interface Props { children: ReactNode; }

export default function Layout({ children }: Props) {
  const [scrolled, setScrolled]           = useState(false);
  const [mobileSearch, setMobileSearch]   = useState(false);
  const [drawerOpen, setDrawerOpen]       = useState(false);
  const [libCount, setLibCount]           = useState(0);
  
  const router   = useRouter();
  const pathname = usePathname();
  const params   = useSearchParams();
  const type     = params.get("type");
  const isTV     = type === "tv";
  const isInfoPage = pathname.includes("/info");

  const updateCount = useCallback(() => {
    const list = getWatchlist("watchlist");
    const favs = getWatchlist("favorites");
    setLibCount(list.length + favs.length);
  }, []);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 24);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    updateCount();
    window.addEventListener("hotpop_update_watchlist", updateCount);
    window.addEventListener("hotpop_update_favorites", updateCount);
    return () => {
      window.removeEventListener("hotpop_update_watchlist", updateCount);
      window.removeEventListener("hotpop_update_favorites", updateCount);
    };
  }, [updateCount]);

  // Close mobile search on route change
  useEffect(() => { setMobileSearch(false); }, [pathname, params]);

  const handleToggle = () => {
    router.push(isTV ? "/" : "/?type=tv");
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg-primary)" }}>

      {/* ────── NAV ────── */}
      {!isInfoPage && (
        <header
          className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
            scrolled ? "glass-nav py-3" : "py-5 bg-transparent"
          }`}
        >
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 flex items-center gap-4">

            {/* Logo */}
            <Link href="/" id="nav-logo" className="flex items-center gap-2.5 flex-shrink-0 group" aria-label="HotPopTime Home">
                <div className="relative w-9 h-9">
                  {/* Outer glow ring */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-yellow-400 via-orange-400 to-yellow-500 opacity-0 group-hover:opacity-70 blur-md transition-all duration-300" />
                  <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-gold to-gold-dim flex items-center justify-center shadow-gold-sm">
                    <svg className="w-5 h-5 text-bg-primary" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18 3v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2h2V3h-2zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm10 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z"/>
                    </svg>
                  </div>
                </div>
              <div className="leading-none">
                <span className="font-outfit font-black text-xl sm:text-2xl tracking-tight gold-text">
                  HOTPOP
                </span>
                <span className="font-outfit font-black text-xl sm:text-2xl tracking-tight text-white/60">
                  TIME
                </span>
              </div>
            </Link>

            {/* Search bar — desktop */}
            <div className="hidden md:flex flex-1 max-w-md">
              <Search />
            </div>

            <div className="flex items-center gap-2.5 ml-auto">
              {/* Library (Watchlist/Favorites) Button */}
              <button
                id="nav-library-btn"
                onClick={() => setDrawerOpen(true)}
                className="relative flex items-center justify-center w-9 h-9 rounded-full btn-ghost"
                aria-label="Open Library"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h2a2 2 0 012 2v3a2 2 0 002 2h3a2 2 0 012 2v7a2 2 0 01-2 2H7a2 2 0 01-2-2V5z" />
                </svg>
                {libCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent-blue text-[9px] font-bold text-white shadow-blue-sm animate-scale-in">
                    {libCount}
                  </span>
                )}
              </button>

              {/* Movies/TV Pill Toggle */}
              <div className="relative flex items-center rounded-full p-1"
                style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.18)" }}>
                <button
                  id="nav-movies-btn"
                  onClick={() => !isTV && null || router.push("/")}
                  className={`relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    !isTV
                      ? "bg-gradient-to-r from-gold to-gold-dim text-bg-primary shadow-gold-sm"
                      : "text-white/50 hover:text-white/80"
                  }`}
                  aria-pressed={!isTV}
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 3v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2h2V3h-2zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm10 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z"/>
                  </svg>
                  Movies
                </button>
                <button
                  id="nav-tv-btn"
                  onClick={() => isTV && null || router.push("/?type=tv")}
                  className={`relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    isTV
                      ? "bg-gradient-to-r from-accent-blue to-blue-600 text-white shadow-blue-sm"
                      : "text-white/50 hover:text-white/80"
                  }`}
                  aria-pressed={isTV}
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z"/>
                  </svg>
                  TV
                </button>
              </div>

              {/* Mobile search icon */}
              <button
                id="nav-mobile-search"
                className="md:hidden flex items-center justify-center w-9 h-9 rounded-full btn-ghost"
                onClick={() => setMobileSearch(v => !v)}
                aria-label="Search"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Search Dropdown */}
          <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileSearch ? "max-h-16 opacity-100" : "max-h-0 opacity-0"
          }`}>
            <div className="px-4 pt-2 pb-3 border-t border-white/5">
              <Search isMobile />
            </div>
          </div>
        </header>
      )}

      {/* ────── PAGE CONTENT ────── */}
      <main className={`flex-1 ${!isInfoPage ? "pt-[72px]" : ""}`}>
        {children}
      </main>

      {/* ────── FOOTER ────── */}
      {!isInfoPage && (
        <footer className="relative mt-20 overflow-hidden">
          {/* Glow line */}
          <div className="h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px blur-sm bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />

          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-12">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-8">

              {/* Brand */}
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-gold to-gold-dim flex items-center justify-center shadow-gold-sm group-hover:shadow-gold transition-all duration-300">
                  <svg className="w-4 h-4 text-bg-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 3v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2h2V3h-2zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm10 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z"/>
                  </svg>
                </div>
                <span className="font-outfit font-black text-xl gold-text">HOTPOPTIME</span>
              </Link>

              {/* Center */}
              <div className="text-center text-sm">
                <p className="text-white/40">
                  Crafted with <span className="text-red-400">♥</span> by{" "}
                  <a href="https://vkcodes.com" target="_blank" rel="noreferrer"
                    className="text-accent-bright hover:text-blue-300 transition-colors font-semibold">
                    VKcodes
                  </a>
                </p>
                <p className="text-white/20 text-xs mt-1">© {new Date().getFullYear()} All Rights Reserved</p>
              </div>

              {/* Right */}
              <p className="text-white/25 text-xs">
                Powered by{" "}
                <a href="https://www.themoviedb.org" target="_blank" rel="noreferrer"
                  className="text-accent-bright/60 hover:text-accent-bright transition-colors">
                  TMDB
                </a>
              </p>
            </div>
          </div>
        </footer>
      )}
      <WatchlistDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}
