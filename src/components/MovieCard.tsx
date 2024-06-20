import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  movie: any;
  type: string;
}

export default function MovieCard({ movie, type }: Props) {
  const router = useRouter();

  return (
    <div
      className="group transition-gpu duration-300 cursor-pointer"
      onClick={() => router.push(`/info?type=${type}&id=${movie.id}`)}
    >
      <div className="w-36 h-56 md:w-52 md:h-80 relative">
        <Image
          className="transition-gpu duration-200 group-hover:transform group-hover:scale-110 object-cover object-center"
          src={`https://image.tmdb.org/t/p/w185${movie?.poster_path}`}
          layout="fill"
          alt={movie?.title || movie?.name}
        />
      </div>
      <h5 className="text-base ml-1 md:text-xl transition-gpu duration-200 group-hover:transform group-hover:scale-90">
        {movie?.title || movie?.name}
      </h5>
      <h6 className="text-sm ml-1 text-gray-300 transition-gpu duration-200 md:text-base group-hover:transform group-hover:scale-90">
        {movie?.release_date || movie?.first_air_date}
      </h6>
    </div>
  );
}
