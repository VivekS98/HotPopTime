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
    router.pathname
  );
  console.log(router.query);

  if (router.query.items && list) {
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
        <Pagination page={page} total={total} query={router.query.items} />
      </div>
    );
  } else {
    return <Loading />;
  }
}
