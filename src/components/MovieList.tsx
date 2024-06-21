import { useRouter } from "next/navigation";
import MovieCard from "./MovieCard";
// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";

interface Props {
  list: any[];
  type: string;
  genre: string;
  id?: string;
}

export default function MovieList({ list, type, genre, id }: Props) {
  const router = useRouter();

  console.log(list);

  const handleClick = () => {
    if (genre === "similar") {
      router.push(`/list?type=${type}&genere=${genre}&id=${id}`);
    } else {
      router.push(`/list?type=${type}&genere=${genre}`);
    }
  };

  if (list === undefined) {
    console.log(list);
    return (
      <div className="md:ml-6 flex flex-row flex-nowrap bg-transparent overflow-auto transition-all duration-300">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((val) => (
          <div
            key={val}
            className="mx-1 mt-20 min-w-44 h-56 md:min-w-52 md:h-80 bg-slate-50/10 rounded-lg animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="md:ml-6 flex flex-row flex-nowrap bg-transparent overflow-auto transition-all duration-300">
      {list?.map((movie, ind) => (
        <MovieCard key={`${movie?.title}/${ind}`} movie={movie} type={type} />
      ))}

      <div
        onClick={() => handleClick()}
        className="group flex justify-center items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 m-10 transition duration-200 text-white group-hover:transform group-hover:scale-125"
          viewBox="0 0 20 20 "
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
}
