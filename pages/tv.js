import Head from "next/head";
import MovieList from "../components/MovieList";
import { fetchList } from "../utils/api";

export default function TV(props) {
  const list = JSON.parse(props.list);

  return (
    <>
      <Head>
        <title>TV | HOTPOPTIME</title>
        <meta name="description" content="A Place for Movie Seekers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h2 className="text-xl m-3 font-semibold text-gray-100 md:text-3xl">
        Popular
      </h2>
      <MovieList list={list.popular} genre="popular" />
      <br />
      <h2 className="text-xl m-3 font-semibold text-gray-100 md:text-3xl">
        Top Rated
      </h2>
      <MovieList list={list.topRated} genre="top_rated" />
    </>
  );
}

export async function getStaticProps() {
  const popular = await fetchList("tv", "popular");
  const topRated = await fetchList("tv", "top_rated");

  const list = JSON.stringify({
    popular: popular.results,
    topRated: topRated.results,
  });

  return {
    props: {
      list: list,
    },
    revalidate: 60 * 60 * 6,
  };
}
