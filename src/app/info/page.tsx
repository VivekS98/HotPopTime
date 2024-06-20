"use client";

import Image from "next/image";
import Head from "next/head";
import { useEffect, useState } from "react";
import MovieList from "@/components/MovieList";
import Search from "@/components/Search";
import { fetchDetails, fetchSimilarList } from "@/utils/api";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "@/components/Loading";
import Link from "next/link";

interface ProductionProps {
  data: any;
  type: string;
}

function Production({ data, type }: ProductionProps) {
  const router = useRouter();

  return (
    <div className="flex flex-row overflow-auto">
      {data?.map((item: any, ind: number) => {
        return (
          <div
            key={ind}
            className="group m-3"
            onClick={() =>
              router.push(`/list?type=${type}&genere=production&id=${item.id}`)
            }
          >
            <div className="group w-[150px] h-[80px] md:w-[200px] md:h-[100px] relative">
              <Image
                className="bg-gray-400 bg-opacity-50 rounded-xl transition-gpu duration-200 group-hover:bg-opacity-100"
                src={`https://image.tmdb.org/t/p/w300${item.logo_path}`}
                layout="fill"
                alt={data?.title ? data?.title : data?.name}
              />
            </div>

            <h5 className="text-lg">{item.name}</h5>
            <h6 className="text-gray-300 text-lg">{item.origin_country}</h6>
          </div>
        );
      })}
    </div>
  );
}

export default function Show() {
  const [data, setData] = useState<any>({});
  const [similar, setSimilar] = useState<any>([]);

  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id") || "0";
  const type = params.get("type") || "movie";

  const handleClick = () => {
    if (type === "tv") {
      router.push("/?type=tv");
    } else {
      router.push("/");
    }
  };

  useEffect(() => {
    fetchDetails(type, id)
      .then((res) => setData(res))
      .catch((err) => console.error(err));

    fetchSimilarList(type, id)
      .then((res) => setSimilar(res))
      .catch((err) => console.error(err));
  }, [type, id]);

  let genresView = data?.genres?.map((item: any, ind: number) => {
    return (
      <h6 className="ml-2" key={ind}>
        {item.name}
      </h6>
    );
  });
  let languages = data?.spoken_languages?.map((item: any, ind: number) => {
    return (
      <h6 key={ind} className="ml-2">
        {item.english_name}
      </h6>
    );
  });
  let similarView = (
    <MovieList
      list={similar?.results || []}
      type={type}
      genre="similar"
      id={data?.id}
    />
  );

  if (!data?.id) {
    return <Loading />;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#130F2D",
        backgroundImage: `url(https://image.tmdb.org/t/p/original${data?.backdrop_path})`,
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <Head>
        <title>{data?.title}</title>
        <meta property="og:title" content={data?.title} key="title" />
        <meta name="description" content={data?.overview} key="description" />
      </Head>
      <div className="bg-default bg-opacity-50 min-h-screen p-2 md:p-5">
        <header className=" flex flex-row justify-between items-center">
          <Link
            className="font-modak text-3xl sm:text-4xl text-[gold] md:text-5xl"
            href="/"
          >
            HOTPOPTIME
          </Link>
          <Search />
          <button
            onClick={handleClick}
            className="px-2 py-1 text-base rounded-md ring-2 ring-white transition duration-200 md:px-4 md:py-2 md:text-xl hover:bg-white hover:text-opposite active:bg-default active:text-white"
          >
            {type === "tv" ? "TV" : "Movies"}
          </button>
        </header>
        <div className="m-3 lg:mx-[200px]">
          <div className="flex flex-row flex-nowrap pb-5 flec-nowrap justify-between">
            <div className="w-36 h-48 md:w-60 md:h-96 lg:w-[330px] lg:h-[500px] relative">
              <Image
                src={`https://image.tmdb.org/t/p/w342${data?.poster_path}`}
                className="object-fill object-center"
                layout="fill"
                priority
                alt={data?.title ? data?.title : data?.name}
              />
            </div>
            <div className="flex flex-col justify-around ml-2 p-0 items-baseline">
              <div>
                <h1 className="text-lg font-semibold sm:text-2xl md:text-4xl">
                  {data?.title ? data?.title : data?.name}
                </h1>
                <h3 className="text-lg hidden text-gray-300 sm:text-xl md:flex">
                  {data?.tagline}
                </h3>
              </div>
              <h3 className="text-lg font-semibold sm:text-xl">
                Release:
                <span className="text-gray-300 ml-2 font-medium">
                  {data?.release_date
                    ? data?.release_date
                    : data?.first_air_date}
                </span>
              </h3>
              <h3 className="text-lg font-semibold sm:text-xl">
                Rating:
                <span className="text-gray-300 ml-2 font-medium">
                  {data?.vote_average}
                </span>
              </h3>
              <h3 className="flex-row flex-wrap hidden text-lg font-semibold sm:text-xl md:flex">
                Languages:
                <span className="flex flex-row flex-wrap text-gray-300 ml-2 font-medium">
                  {languages}
                </span>
              </h3>
            </div>
          </div>
          <h3 className="text-lg font-semibold md:hidden">
            Tagline:
            <span className="text-gray-300 font-normal ml-2 text-lg sm:text-xl">
              {data?.tagline}
            </span>
          </h3>
          <h3 className="flex flex-row flex-wrap text-lg font-semibold sm:text-xl md:hidden">
            Languages:
            <span className="flex flex-row flex-wrap text-gray-300 font-medium">
              {languages}
            </span>
          </h3>
          <h3 className="flex flex-row text-lg font-semibold sm:text-xl">
            Genres:
            <span className="flex flex-row flex-wrap text-gray-300 ml-2 font-medium">
              {genresView}
            </span>
          </h3>
          <div className="my-3 md:my-5">
            <h3 className="text-xl font-semibold md:text-2xl">Overview:</h3>
            <p className="text-gray-300 text-lg">{data?.overview}</p>
          </div>
          <div className="my-3 md:my-5">
            <h3 className="text-xl font-semibold md:text-2xl">Production:</h3>
            <Production data={data?.production_companies} type={type} />
          </div>
          <h2 className="text-xl mb-3 font-semibold md:text-2xl">Similar:</h2>
        </div>
        <div className="bg-transparent">{similarView}</div>
      </div>
    </div>
  );
}
