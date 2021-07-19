import Image from "next/image";
import { useRouter } from "next/router";

export default function MovieCard({ movie, type }) {
  const router = useRouter();

  return (
    <div
      className="group flex-grow transition duration-300"
      onClick={() => router.push(`/info/${type}/${movie.id}`)}
    >
      <div className="w-36 h-48 md:w-52 md:h-80 relative cursor-pointer">
        <Image
          className="transition-gpu duration-200 group-hover:transform group-hover:scale-110"
          src={`https://image.tmdb.org/t/p/w185${movie?.poster_path}`}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          alt={movie?.title}
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
