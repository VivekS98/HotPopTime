import { useEffect, useState } from "react";
import BottomScrollListener from "react-bottom-scroll-listener";
import Page, { useLazySwr } from "./Page";

export default function ListMovies({ genre, id, type }) {
  const { data, error, isLoading, isError } = useLazySwr(genre, id, type, page);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const pages = [];

  const appendList = () => {
    setPage((prev) => {
      pages.push(<Page genre={genre} id={id} type={type} page={prev + 1} />);
      return prev + 1;
    });
  };

  useEffect(() => {
    if (data) {
      setTotalPages(data.total_pages);
      pages.push(<Page genre={genre} id={id} type={type} page={1} />);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, genre]);

  console.log(pages);

  if (isLoading) {
    return (
      <div className="w-screen h-screen bg-default fixed flex flex-col justify-center items-center">
        <svg
          className="animate-spin h-10 w-10 rounded-full border-r-2 mb-3 border-gray-300 md:w-14 md:h-14 md:border-r-4"
          viewBox="0 0 24 24"
        ></svg>
        <span className="animate-pulse font-modak text-4xl text-[gold] md:text-5xl">
          HOTPOPTIME
        </span>
      </div>
    );
  }

  if (isError) {
    console.log(error);
  }

  return (
    <BottomScrollListener onBottom={() => appendList()}>
      <div className="flex flex-row flex-wrap justify-center bg-transparent">
        {pages}
      </div>
      {page !== totalPages && (
        <svg
          className="animate-spin h-10 w-10 rounded-full border-r-2 mb-3 border-gray-300 md:w-14 md:h-14 md:border-r-4"
          viewBox="0 0 24 24"
        ></svg>
      )}
    </BottomScrollListener>
  );
}
