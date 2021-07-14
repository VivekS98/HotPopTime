import MovieCard from "./MovieCard";

export default function MovieList({ list }) {
  return (
    <div className="flex flex-row flex-nowrap justify-center">
      {list.map((movie, ind) => (
        <MovieCard key={`${ind}${movie.title}`} movie={movie} />
      ))}
    </div>
  );
}
