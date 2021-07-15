import Head from "next/head";
import MovieList from "../components/MovieList";
import { fetchList } from "../utils/api";

export default function Home(props) {
  const list = JSON.parse(props.list);

  return (
    <>
      <Head>
        <title>HOTPOPTIME</title>
        <meta name="description" content="A Place for Movie Seekers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <br />
      <h2 className="text-xl m-3 font-semibold text-gray-100 md:text-3xl">
        Now Playing
      </h2>
      <MovieList list={list.nowPlaying} genre="now_playing" />
      <br />
      <h2 className="text-xl m-3 font-semibold text-gray-100 md:text-3xl">
        Popular
      </h2>
      <MovieList list={list.popular} genre="popular" />
      <br />
      <h2 className="text-xl m-3 font-semibold text-gray-100 md:text-3xl">
        Top Rated
      </h2>
      <MovieList list={list.topRated} genre="top_rated" />
      <br />
      <h2 className="text-xl m-3 font-semibold text-gray-100 md:text-3xl">
        Upcoming
      </h2>
      <MovieList list={list.upcoming} genre="upcoming" />
    </>
  );
}

export async function getStaticProps() {
  const nowPlaying = await fetchList("movie", "now_playing");
  const popular = await fetchList("movie", "popular");
  const topRated = await fetchList("movie", "top_rated");
  const upcoming = await fetchList("movie", "upcoming");

  const list = JSON.stringify({
    nowPlaying: nowPlaying.results,
    popular: popular.results,
    topRated: topRated.results,
    upcoming: upcoming.results,
  });

  return {
    props: {
      list: list,
    },
    revalidate: 60 * 60 * 6,
  };
}
