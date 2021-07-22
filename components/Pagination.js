import Link from "next/link";
import { useEffect, useState } from "react";

export default function Pagination({ page, total, query }) {
  const [state, setState] = useState(0);
  const prev = Number(page) > 1;
  const next = Number(page) < Number(total);

  const prev4 = page - 4 < 1 ? "none" : "block";
  const prev2 = page - 2 < 1 ? "none" : "";
  const next2 = page + 2 > total ? "none" : "block";
  const next4 = page + 4 > total ? "none" : "";

  useEffect(() => {
    setState((prev) => prev + 1);
  }, [page]);

  return (
    <div className="flex flex-row flex-nowrap justify-center items-center">
      <div
        style={{
          pointerEvents: prev ? "auto" : "none",
          opacity: prev ? "1" : "0.5",
        }}
      >
        <Link
          href={{
            pathname: "/list/[...items]",
            query: { items: query, page: page - 1 },
          }}
          passHref
        >
          <button className="m-2 sm:m-4 py-1 px-2  text-white text-base sm:text-lg sm:py-2 sm:px-4 font-semibold  text-center rounded-lg transition-gpu duration-200 ease-in cursor-pointer ring-yellow-500 hover:bg-[gold] hover:text-black hover:ring-2 active:bg-yellow-500 active:text-black">
            Prev
          </button>
        </Link>
      </div>

      <div style={{ display: prev4 }}>
        <Link
          href={{
            pathname: "/list/[...items]",
            query: { items: query, page: page - 4 },
          }}
          passHref
        >
          <button className="m-2 sm:m-4 py-1 px-2  text-white text-base sm:text-lg font-semibold  text-center rounded-full transition-gpu duration-200 ease-in cursor-pointer ring-yellow-500 hover:bg-[gold] hover:text-black hover:ring-2 active:bg-yellow-500 active:text-black">
            {page - 4}
          </button>
        </Link>
      </div>

      <div style={{ display: prev2 }}>
        <Link
          href={{
            pathname: "/list/[...items]",
            query: { items: query, page: page - 2 },
          }}
          passHref
        >
          <button className="m-2 sm:m-4 py-1 px-2  text-white text-base sm:text-lg font-semibold  text-center rounded-full transition-gpu duration-200 ease-in cursor-pointer ring-yellow-500 hover:bg-[gold] hover:text-black hover:ring-2 active:bg-yellow-500 active:text-black">
            {page - 2}
          </button>
        </Link>
      </div>

      <button className="pointer-events-none bg-[gold] m-2 py-1 px-2 text-opposite text-base sm:text-lg font-semibold text-center rounded-full ">
        {page}
      </button>

      <div className={page + 2 < 1 ? "hidden" : ""}>
        <Link
          href={{
            pathname: "/list/[...items]",
            query: { items: query, page: page + 2 },
          }}
          passHref
        >
          <button className="m-2 sm:m-4 py-1 px-2  text-white text-base sm:text-lg font-semibold  text-center rounded-full transition-gpu duration-200 ease-in cursor-pointer ring-yellow-500 hover:bg-[gold] hover:text-black hover:ring-2 active:bg-yellow-500 active:text-black">
            {page + 2}
          </button>
        </Link>
      </div>
      <div className={page + 4 < 1 ? "hidden" : ""}>
        <Link
          href={{
            pathname: "/list/[...items]",
            query: { items: query, page: page + 4 },
          }}
          passHref
        >
          <button className="m-2 sm:m-4 py-1 px-2  text-white text-base sm:text-lg font-semibold  text-center rounded-full transition-gpu duration-200 ease-in cursor-pointer ring-yellow-500 hover:bg-[gold] hover:text-black hover:ring-2 active:bg-yellow-500 active:text-black">
            {page + 4}
          </button>
        </Link>
      </div>

      <div
        style={{
          pointerEvents: next ? "auto" : "none",
          opacity: next ? "1" : "0.5",
        }}
      >
        <Link
          href={{
            pathname: "/list/[...items]",
            query: { items: query, page: page + 1 },
          }}
          passHref
        >
          <button className="m-2 sm:m-4 py-1 px-2  text-white text-base sm:text-lg sm:py-2 sm:px-4 font-semibold  text-center rounded-lg transition-gpu duration-200 ease-in cursor-pointer ring-yellow-500 hover:bg-[gold] hover:text-black hover:ring-2 active:bg-yellow-500 active:text-black">
            Next
          </button>
        </Link>
      </div>
    </div>
  );
}
