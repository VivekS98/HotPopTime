import Head from "next/head";
import { useRouter } from "next/router";
import Loading from "../../components/Loading";
import MovieCard from "../../components/MovieCard";
import Pagination from "../../components/Pagination";
import { useFetchList } from "../../utils/hooks";

export default function Items() {
  const router = useRouter();
  const { list, page, total, isLoading } = useFetchList(
    router.query,
    router.asPath
  );
  if (isLoading) {
    return <Loading />;
  } else if (router.query.items && list?.length < 1) {
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
        <h3 className="text-xl font-semibold">
          No such {router.query.items[0]}
        </h3>
      </div>
    );
  } else if (router.query.items && list && !isLoading) {
    return (
      <div className="flex flex-col items-center">
        <Head>
          <title>{`${router?.query?.items[1]} | HOTPOPTIME`}</title>
          <meta
            property="og:title"
            content={router?.query?.items[1]}
            key="title"
          />
          <meta
            name="description"
            content="Paginated list of Movies/TV."
            key="description"
          />
        </Head>
        <h2 className="text-2xl m-2 font-semibold text-left sm:text-3xl md:text-4xl md:m-4">
          {router?.query?.items[1]}
        </h2>
        <div className="flex flex-row flex-wrap justify-center bg-transparent">
          {list.map((movie, ind) => (
            <div
              key={`${movie?.title}/${ind}`}
              className="w-36 mb-2 min-h-56 md:mb-4 md:w-52 md:min-h-80"
            >
              <MovieCard movie={movie} type={router.query.items[0]} />
            </div>
          ))}
        </div>
        <Pagination page={page} total={total} query={router.query} />
      </div>
    );
  }
}
