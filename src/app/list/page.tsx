"use client";

import Head from "next/head";
import Loading from "@/components/Loading";
import MovieCard from "@/components/MovieCard";
import Pagination from "@/components/Pagination";
import { getFetchList } from "@/utils/fetchList";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Items() {
  const [list, setList] = useState<any>([]);
  const [total, setTotal] = useState(0);
  const params = useSearchParams();
  const page = Number(params.get("page")) || 1;
  const query = params.get("query") || "";
  const genere = params.get("genere") || "";
  const id = params.get("id") || "0";
  const type = params.get("type") || "movie";

  useEffect(() => {
    getFetchList({ items: [type, genere, id], page, query })
      .then((data) => {
        setList(data.list);
        setTotal(data.total);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, id, page, genere, query]);

  if (type && list?.length < 1) {
    return (
      <div className="flex flex-row flex-wrap justify-center items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"
          />
        </svg>
        <h3 className="text-xl font-semibold">No such {type}</h3>
      </div>
    );
  } else if (genere && list) {
    return (
      <div className="flex flex-col items-center">
        <Head>
          <title>{`${genere} | HOTPOPTIME`}</title>
          <meta property="og:title" content={genere} key="title" />
          <meta
            name="description"
            content="Paginated list of Movies/TV."
            key="description"
          />
        </Head>
        <h2 className="text-2xl m-2 font-semibold text-left sm:text-3xl md:text-4xl md:m-4 first-letter:capitalize">
          {genere.replace("_", " ")}
        </h2>
        <div className="sm:mx-14 flex flex-row flex-wrap justify-center gap-5 bg-transparent transition-all duration-300">
          {list.map((movie: any, ind: number) => (
            <div
              key={`${movie?.title}/${ind}`}
              className="w-36 min-h-56 md:mb-4 md:w-52 md:min-h-80 transition-all duration-500 hover:mx-4"
            >
              <MovieCard movie={movie} type={type} />
            </div>
          ))}
        </div>
        <Pagination total={total} />
      </div>
    );
  } else {
    return <Loading />;
  }
}
