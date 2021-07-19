import { fetchDetails, fetchSimilarList } from "../../utils/api";
import MovieList from "../../components/MovieList";
import Image from "next/image";
import Head from "next/head";

export default function Show(props) {
  const data = JSON.parse(props.details);
  const similar = JSON.parse(props.similar);

  let genresView = [...data.genres].map((item, ind) => {
    return (
      <h6 className="ml-2" key={ind}>
        {item.name}
      </h6>
    );
  });
  let languages = [...data.spoken_languages].map((item, ind) => {
    return (
      <h6 key={ind} className="ml-2">
        {item.english_name}
      </h6>
    );
  });
  let similarView = <MovieList list={similar} type={props.params[0]} />;

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#130F2D",
        backgroundImage: `url(https://image.tmdb.org/t/p/original${data.backdrop_path})`,
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <Head></Head>
      <div className="bg-default bg-opacity-50 min-h-screen p-2 md:p-5">
        <div className="mx-5 lg:mx-[200px]">
          <div className="flex flex-row flex-wrap pb-5 flec-nowrap justify-between sm:flex-nowrap">
            <div className="w-36 h-48 md:w-60 md:h-96 lg:w-[330px] lg:h-[500px] relative">
              <Image
                className="transition-gpu duration-200"
                src={`https://image.tmdb.org/t/p/w342${data.poster_path}`}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                alt={data.title}
              />
            </div>
            <div className="flex flex-col justify-around items-start">
              <h1 className="text-lg font-semibold sm:text-2xl md:text-4xl">
                {data.title ? data.title : data.name}
              </h1>
              <h3 className="text-lg text-gray-300 sm:text-xl">
                {data.tagline}
              </h3>
              <h3 className="text-lg font-semibold sm:text-xl">
                Release:
                <span className="text-gray-300 ml-2 font-medium">
                  {data.release_date ? data.release_date : data.first_air_date}
                </span>
              </h3>
              <h3 className="text-lg font-semibold sm:text-xl">
                Rating:
                <span className="text-gray-300 ml-2 font-medium">
                  {data.vote_average}
                </span>
              </h3>
              <h3 className="flex flex-row flex-wrap text-lg font-semibold sm:text-xl">
                Languages:
                <span className="flex flex-row flex-wrap text-gray-300 ml-2 font-medium">
                  {languages}
                </span>
              </h3>
            </div>
          </div>
          <h3 className="flex flex-row flex-wrap text-lg font-semibold sm:text-xl">
            Genres:
            <span className="flex flex-row flex-wrap text-gray-300 ml-2 font-medium">
              {genresView}
            </span>
          </h3>
          <div className="my-3 md:my-5">
            <h3 className="text-xl font-semibold md:text-2xl">Overview:</h3>
            <p className="text-gray-300 text-lg">{data.overview}</p>
          </div>
          <h2 className="text-xl mb-3 font-semibold md:text-2xl">Similar:</h2>
        </div>
        <div className="bg-transparent">{similarView}</div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const { show } = params;

  const data = await fetchDetails(show[0], show[1]);
  const similar = await fetchSimilarList(show[0], show[1]);

  return {
    props: {
      details: JSON.stringify(data),
      similar: JSON.stringify(similar.results),
      params: show,
    },
  };
}
