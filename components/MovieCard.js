import Image from "next/image";

export default function MovieCard({ movie }) {
  return (
    <div className="group flex-grow transition duration-300">
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
      <h5 className="text-base md:text-xl">{movie?.title || movie?.name}</h5>
      <h6 className="text-sm text-gray-300 md:text-base">
        {movie?.release_date || movie?.first_air_date}
      </h6>
    </div>
  );
}
