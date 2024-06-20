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
      <CardBody className="z-0 transition-all duration-500 group-hover:mx-12 md:group-hover:mx-14 my-4">
        <div
          className="transition duration-300 cursor-pointer w-fit"
          onClick={() => router.push(`/info?type=${type}&id=${movie.id}`)}
        >
          <CardItem>
            <div className="w-36 h-56 md:w-52 md:h-80 transition duration-500 relative">
              <Image
                className="transition-all duration-500 group-hover:transform group-hover:scale-150 p-0.5 group-hover:ring-1 ring-blue-300 object-cover object-center rounded-lg"
                src={`https://image.tmdb.org/t/p/w185${movie?.poster_path}`}
                layout="fill"
                alt={movie?.title || movie?.name}
              />
              <div className="transition duration-500 group-hover:absolute group-hover:scale-150 w-full h-full bg-gradient-to-b from-transparent to-[#130F2D]/40 rounded-lg" />
            </div>
          </CardItem>
          <CardItem>
            <h5 className="text-base ml-1 md:text-xl transition duration-200 group-hover:transform group-hover:scale-90">
              {movie?.title || movie?.name}
            </h5>
          </CardItem>
          <CardItem>
            <h6 className="text-sm ml-1 text-gray-300 transition duration-200 md:text-base group-hover:transform group-hover:scale-90">
              {movie?.release_date || movie?.first_air_date}
            </h6>
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
