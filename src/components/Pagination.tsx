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

  const prev = Number(page) > 1;
  const next = Number(page) < Number(total);

  const prev4 = page - 4 < 1 ? "none" : "block";
  const prev2 = page - 2 < 1 ? "none" : "";
  const next2 = page + 2 > total ? "none" : "block";
  const next4 = page + 4 > total ? "none" : "";

  return (
    <div className="flex flex-row flex-nowrap justify-center items-center">
      <div
        style={{
          pointerEvents: prev ? "auto" : "none",
          opacity: prev ? "1" : "0.5",
        }}
      >
        <Link
          href={`/list?page=1&query=${query}&genere=${genere}&id=${id}&type=${type}`}
          passHref
        >
          <button className="m-1 sm:m-4 py-1 px-2  text-white text-base sm:text-lg sm:py-2 sm:px-4 font-semibold  text-center rounded-lg transition-gpu duration-200 ease-in cursor-pointer ring-yellow-500 hover:bg-[gold] hover:text-black hover:ring-2 active:bg-yellow-500 active:text-black">
            First
          </button>
        </Link>
      </div>

      <div style={{ display: prev4 }}>
        <Link
          href={`/list?page=${
            page - 2
          }&query=${query}&genere=${genere}&id=${id}&type=${type}`}
          passHref
        >
          <button className="m-1 sm:m-4 py-1 px-2  text-white text-base sm:text-lg font-semibold  text-center rounded-full transition-gpu duration-200 ease-in cursor-pointer ring-yellow-500 hover:bg-[gold] hover:text-black hover:ring-2 active:bg-yellow-500 active:text-black">
            {page - 2}
          </button>
        </Link>
      </div>

      <div style={{ display: prev2 }}>
        <Link
          href={`/list?page=${
            page - 1
          }&query=${query}&genere=${genere}&id=${id}&type=${type}`}
          passHref
        >
          <button className="m-1 sm:m-4 py-1 px-2  text-white text-base sm:text-lg font-semibold  text-center rounded-full transition-gpu duration-200 ease-in cursor-pointer ring-yellow-500 hover:bg-[gold] hover:text-black hover:ring-2 active:bg-yellow-500 active:text-black">
            {page - 1}
          </button>
        </Link>
      </div>

      <button className="pointer-events-none bg-[gold] m-2 py-1 px-2 text-opposite text-base sm:text-lg font-semibold text-center rounded-full ">
        {page}
      </button>

      <div style={{ display: next2 }}>
        <Link
          href={`/list?page=${
            page + 1
          }&query=${query}&genere=${genere}&id=${id}&type=${type}`}
          passHref
        >
          <button className="m-1 sm:m-4 py-1 px-2  text-white text-base sm:text-lg font-semibold  text-center rounded-full transition-gpu duration-200 ease-in cursor-pointer ring-yellow-500 hover:bg-[gold] hover:text-black hover:ring-2 active:bg-yellow-500 active:text-black">
            {page + 1}
          </button>
        </Link>
      </div>
      <div style={{ display: next4 }}>
        <Link
          href={`/list?page=${
            page + 2
          }&query=${query}&genere=${genere}&id=${id}&type=${type}`}
          passHref
        >
          <button className="m-1 sm:m-4 py-1 px-2  text-white text-base sm:text-lg font-semibold  text-center rounded-full transition-gpu duration-200 ease-in cursor-pointer ring-yellow-500 hover:bg-[gold] hover:text-black hover:ring-2 active:bg-yellow-500 active:text-black">
            {page + 2}
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
          href={`/list?page=${total}&query=${query}&genere=${genere}&id=${id}&type=${type}`}
          passHref
        >
          <button className="m-1 sm:m-4 py-1 px-2  text-white text-base sm:text-lg sm:py-2 sm:px-4 font-semibold  text-center rounded-lg transition-gpu duration-200 ease-in cursor-pointer ring-yellow-500 hover:bg-[gold] hover:text-black hover:ring-2 active:bg-yellow-500 active:text-black">
            Last
          </button>
        </Link>
      </div>
    </div>
  );
}
