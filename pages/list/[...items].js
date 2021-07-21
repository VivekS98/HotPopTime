import { useRouter } from "next/router";
import MovieCard from "../../components/MovieCard";
import { BottomScrollListener } from "react-bottom-scroll-listener";
import {
  fetchList,
  fetchListByCompany,
  fetchSimilarList,
  searchQuery,
} from "../../utils/api";
import { useState } from "react";

export default function Items(props) {
  const data = JSON.parse(props.data);

  const [page, setPage] = useState(1);
  const [list, setList] = useState(data.results);
  const router = useRouter();
  console.log(router.query.items);

  const appendList = () => {};

  return (
    <BottomScrollListener onBottom={() => appendList()}>
      <div className="flex flex-col items-center">
        <div className="flex flex-row flex-wrap justify-center bg-transparent">
          {list.map((movie) => (
            <div
              key={movie?.title}
              className="w-36 min-h-56 md:w-52 md:min-h-80"
            >
              <MovieCard movie={movie} type={props.params[0]} />
            </div>
          ))}
        </div>
        {page !== data.total_pages && (
          <svg
            className="animate-spin h-10 w-10 rounded-full border-r-2 mb-3 border-gray-300 md:w-14 md:h-14 md:border-r-4"
            viewBox="0 0 24 24"
          ></svg>
        )}
      </div>
    </BottomScrollListener>
  );
}

export async function getServerSideProps({ params }) {
  const { items } = params;
  let result = {};
  switch (items[1]) {
    case "similar":
      result = await fetchSimilarList(items[0], items[2], 1);
      break;
    case "production":
      result = await fetchListByCompany(items[0], items[2], 1);
      break;
    case "search":
      result = await searchQuery(items[0], items[1], 1);
      break;
    default:
      result = await fetchList(items[0], items[1], 1);
      break;
  }

  return {
    props: {
      data: JSON.stringify(result),
      params: items,
    },
  };
}
