import Image from "next/image";

export default function MovieCard({ movie }) {
  return (
    <div className="group w-1/4 md:w-80 transition duration-300">
      <div className="w-24 h-36 sm:w-36 sm:h-52 md:w-44 md:h-72 group-hover:z-0 relative cursor-pointer">
        <Image
          className="transition duration-200 group-hover:transform group-hover:scale-110"
          src={`https://image.tmdb.org/t/p/w185${movie?.poster_path}`}
          layout="fill"
          objectFit="cover"
          alt={movie?.title}
        />
      </div>
      <h5 className="text-xl">{movie?.title || movie?.name}</h5>
      <h6 className="text-lg text-gray-300">
        {movie?.release_date || movie?.first_air_date}
      </h6>
    </div>
  );
}
