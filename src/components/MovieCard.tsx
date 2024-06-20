import Image from "next/image";
import { useRouter } from "next/navigation";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";

interface Props {
  movie: any;
  type: string;
}

export default function MovieCard({ movie, type }: Props) {
  const router = useRouter();

  return (
    <CardContainer className="group transition-all duration-500">
      <CardBody className="z-0 transition-all delay-150 duration-500 group-hover:mx-12 md:group-hover:mx-14 my-4">
        <div
          className="transition duration-300 cursor-pointer w-fit"
          onClick={() => router.push(`/info?type=${type}&id=${movie.id}`)}
        >
          <CardItem>
            <div className="w-36 h-56 md:w-52 md:h-80 transition duration-500 relative">
              <Image
                className="transition-all duration-500 group-hover:transform group-hover:scale-150 p-0.5 group-hover:ring-1 ring-blue-200/80 object-cover object-center rounded-lg"
                src={`https://image.tmdb.org/t/p/w185${movie?.poster_path}`}
                layout="fill"
                alt={movie?.title || movie?.name}
              />
              <div className="transition duration-500 group-hover:absolute group-hover:scale-150 w-full h-full bg-gradient-to-b from-transparent via-transparent to-[#130F2D] rounded-lg" />
            </div>
          </CardItem>
          <CardItem translateZ="80">
            <h5 className="text-base text-g ml-1 md:text-xl group-hover:-translate-y-10 hidden group-hover:block">
              {movie?.title || movie?.name}
            </h5>
          </CardItem>
          <CardItem translateZ="50">
            <h6 className="text-sm ml-1 md:text-base group-hover:-translate-y-10 hidden group-hover:block">
              {movie?.release_date || movie?.first_air_date}
            </h6>
          </CardItem>
          <CardItem translateZ="60">
            <h3 className="m-1 text-base font-semibold items-center group-hover:-translate-y-10 hidden group-hover:flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                />
              </svg>

              <span className="text-gray-300 ml-2 font-medium">
                {movie?.vote_average?.toFixed(2)}
              </span>
            </h3>
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
