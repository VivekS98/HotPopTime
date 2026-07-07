import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface Props {
  total: number;
}

export default function Pagination({ total }: Props) {
  const params = useSearchParams();
  const page = Number(params.get("page")) || 1;
  const query = params.get("query") || "";
  const genere = params.get("genere") || "";
  const id = params.get("id") || "0";
  const type = params.get("type") || "movie";

  const hasPrev = page > 1;
  const hasNext = page < total;

  const buildHref = (p: number) =>
    `/list?page=${p}&query=${query}&genere=${genere}&id=${id}&type=${type}`;

  // Build page range
  const pages: number[] = [];
  const delta = 2;
  for (
    let i = Math.max(1, page - delta);
    i <= Math.min(total, page + delta);
    i++
  ) {
    pages.push(i);
  }

  const showLeftEllipsis = pages[0] > 2;
  const showRightEllipsis = pages[pages.length - 1] < total - 1;
  const showFirstPage = pages[0] > 1;
  const showLastPage = pages[pages.length - 1] < total;

  const btnBase =
    "inline-flex items-center justify-center w-9 h-9 rounded-xl text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold/50";

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-1.5 mt-10 mb-6 flex-wrap"
    >
      {/* Previous */}
      <Link
        href={hasPrev ? buildHref(page - 1) : "#"}
        id="pagination-prev"
        aria-label="Previous page"
        aria-disabled={!hasPrev}
        className={`${btnBase} gap-1 px-3 ${
          hasPrev
            ? "bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white"
            : "opacity-30 pointer-events-none bg-white/3 border border-white/5 text-white/40"
        }`}
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="hidden sm:inline text-xs">Prev</span>
      </Link>

      {/* First page */}
      {showFirstPage && (
        <>
          <Link
            href={buildHref(1)}
            id="pagination-page-1"
            className={`${btnBase} bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white`}
          >
            1
          </Link>
          {showLeftEllipsis && (
            <span className="text-white/30 text-sm px-1">…</span>
          )}
        </>
      )}

      {/* Page range */}
      {pages.map((p) => (
        <Link
          key={p}
          href={buildHref(p)}
          id={`pagination-page-${p}`}
          aria-current={p === page ? "page" : undefined}
          className={`${btnBase} ${
            p === page
              ? "bg-gold text-bg-primary font-bold shadow-gold-sm scale-105 pointer-events-none"
              : "bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gold/30 text-white hover:text-gold"
          }`}
        >
          {p}
        </Link>
      ))}

      {/* Last page */}
      {showLastPage && (
        <>
          {showRightEllipsis && (
            <span className="text-white/30 text-sm px-1">…</span>
          )}
          <Link
            href={buildHref(total)}
            id={`pagination-page-${total}`}
            className={`${btnBase} bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white`}
          >
            {total}
          </Link>
        </>
      )}

      {/* Next */}
      <Link
        href={hasNext ? buildHref(page + 1) : "#"}
        id="pagination-next"
        aria-label="Next page"
        aria-disabled={!hasNext}
        className={`${btnBase} gap-1 px-3 ${
          hasNext
            ? "bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white"
            : "opacity-30 pointer-events-none bg-white/3 border border-white/5 text-white/40"
        }`}
      >
        <span className="hidden sm:inline text-xs">Next</span>
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </nav>
  );
}
