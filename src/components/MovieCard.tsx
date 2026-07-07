"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  movie: any;
  type: string;
}

export default function MovieCard({ movie, type }: Props) {
  const router = useRouter();
  const [loaded, setLoaded]     = useState(false);
  const [errored, setErrored]   = useState(false);

  const title      = movie?.title || movie?.name || "Unknown";
  const date       = movie?.release_date || movie?.first_air_date;
  const rating     = movie?.vote_average;
  const posterPath = movie?.poster_path;
  const year       = date ? new Date(date).getFullYear() : null;

  return (
    <article
      id={`card-${movie?.id}`}
      className="flex-shrink-0 cursor-pointer group"
      style={{ width: "170px" }}
      onClick={() => router.push(`/info?type=${type}&id=${movie.id}`)}
      aria-label={`View ${title}`}
    >
      {/* ── Poster ── */}
      <div className="movie-card-wrap" style={{ height: "255px" }}>

        {/* Skeleton */}
        {!loaded && !errored && (
          <div className="absolute inset-0 skeleton z-10" />
        )}

        {/* Image */}
        {posterPath && !errored ? (
          <Image
            src={`https://image.tmdb.org/t/p/w342${posterPath}`}
            alt={title}
            fill
            sizes="170px"
            className={`object-cover transition-all duration-500 ${loaded ? "opacity-100 scale-100" : "opacity-0 scale-105"}`}
            onLoad={() => setLoaded(true)}
            onError={() => setErrored(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center"
            style={{ background: "var(--bg-elevated)" }}>
            <svg className="w-10 h-10 opacity-20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 3v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2h2V3h-2z"/>
            </svg>
          </div>
        )}

        {/* Bottom info overlay (shows on hover) */}
        <div className="absolute inset-x-0 bottom-0 z-20 p-3 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          {rating != null && rating > 0 && (
            <div className="rating-badge mb-2 w-fit">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              {rating.toFixed(1)}
            </div>
          )}
          <p className="text-white font-semibold text-sm leading-tight line-clamp-2">{title}</p>
          {year && <p className="text-white/50 text-xs mt-0.5">{year}</p>}
        </div>

        {/* Play button (shows on hover) */}
        <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
          <div className="w-12 h-12 rounded-full flex items-center justify-center ml-1 transition-transform duration-300 scale-75 group-hover:scale-100"
            style={{ background: "rgba(59,130,246,0.85)", boxShadow: "0 0 24px rgba(59,130,246,0.5)" }}>
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>

        {/* Top-right rating (always visible when loaded) */}
        {loaded && rating != null && rating > 0 && (
          <div className="absolute top-2 left-2 z-20 opacity-100 group-hover:opacity-0 transition-opacity duration-200">
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-md text-xs font-bold"
              style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(8px)" }}>
              <svg className="w-2.5 h-2.5 text-gold" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span className="text-gold-light">{rating.toFixed(1)}</span>
            </div>
          </div>
        )}
      </div>

      {/* ── Title below ── */}
      <div className="mt-2.5 px-0.5">
        <h3 className="text-[13px] font-semibold text-white/80 group-hover:text-white line-clamp-2 leading-tight transition-colors duration-200">
          {title}
        </h3>
        {year && <p className="text-[11px] text-white/35 mt-0.5 font-medium">{year}</p>}
      </div>
    </article>
  );
}
