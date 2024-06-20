"use client";

import Head from "next/head";
import MovieList from "../components/MovieList";
import { fetchList } from "../utils/api";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface Props {
  list: string;
}

export default function Home(props: Props) {
  const [list, setList] = useState<any>({});

  const params = useSearchParams();
  const type = params.get("type");

  useEffect(() => {
    async function getServerSideProps() {
      const nowPlaying = await fetchList(
        type === "tv" ? "tv" : "movie",
        "now_playing"
      );
      const popular = await fetchList(
        type === "tv" ? "tv" : "movie",
        "popular"
      );
      const topRated = await fetchList(
        type === "tv" ? "tv" : "movie",
        "top_rated"
      );
      const upcoming = await fetchList(
        type === "tv" ? "tv" : "movie",
        "upcoming"
      );

      const list = {
        nowPlaying: nowPlaying.results,
        popular: popular.results,
        topRated: topRated.results,
        upcoming: upcoming.results,
      };

      setList(list);
    }

    void getServerSideProps();
  }, [type]);

  return (
    <>
      <Head>
        <title>Movies | HOTPOPTIME</title>
        <meta property="og:title" content="Movies | HOTPOPTIME" key="title" />
        <meta
          name="description"
          content="Fetch Movies as mush as possible."
          key="description"
        />
      </Head>
      <br />
      {type !== "tv" && (
        <>
          <h2 className="text-xl m-3 font-semibold text-gray-100 md:text-3xl">
            Now Playing
          </h2>
          <MovieList
            list={list.nowPlaying}
            type={type === "tv" ? "tv" : "movie"}
            genre="now_playing"
          />
          <br />
        </>
      )}
      <h2 className="text-xl m-3 font-semibold text-gray-100 md:text-3xl">
        Popular
      </h2>
      <MovieList
        list={list.popular}
        type={type === "tv" ? "tv" : "movie"}
        genre="popular"
      />
      <br />
      <h2 className="text-xl m-3 font-semibold text-gray-100 md:text-3xl">
        Top Rated
      </h2>
      <MovieList
        list={list.topRated}
        type={type === "tv" ? "tv" : "movie"}
        genre="top_rated"
      />
      <br />
      {type !== "tv" && (
        <>
          <h2 className="text-xl m-3 font-semibold text-gray-100 md:text-3xl">
            Upcoming
          </h2>
          <MovieList
            list={list.upcoming}
            type={type === "tv" ? "tv" : "movie"}
            genre="upcoming"
          />{" "}
        </>
      )}
    </>
  );
}
