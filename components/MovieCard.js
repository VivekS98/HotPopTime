import Image from "next/image";

export default function MovieCard({ movie }) {
  return (
    <div className="flex flex-col w-60 md:w-80 transition duration-200 hover:bg-purple-300 hover:text-opposite">
      <Image
        src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
        layout="fill"
        alt={movie.title}
      />
      <h5 className="text-xl">{movie.title ? movie.title : movie.name}</h5>
      <h6 className="text-lg bg-gray-300">
        {movie.release_date ? movie.release_date : movie.first_air_date}
      </h6>
    </div>
  );
}
