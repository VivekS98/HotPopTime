import Head from "next/head";
import MovieList from "../components/MovieList";
import { fetchList } from "../utils/api";

export default function TV(props) {
  const list = JSON.parse(props.list);

  return (
    <>
      <Head>
        <title>Movies | HOTPOPTIME</title>
        <meta property="og:title" content="TV | HOTPOPTIME" key="title" />
        <meta
          name="description"
          content="A Place for Show Seekers"
          key="description"
        />
      </Head>
      <h2 className="text-xl m-3 font-semibold text-gray-100 md:text-3xl">
        Popular
      </h2>
      <MovieList list={list.popular} type="tv" genre="popular" />
      <br />
      <h2 className="text-xl m-3 font-semibold text-gray-100 md:text-3xl">
        Top Rated
      </h2>
      <MovieList list={list.topRated} type="tv" genre="top_rated" />
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
