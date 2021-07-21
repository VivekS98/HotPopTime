import { useState } from "react";
import {
  fetchList,
  fetchListByCompany,
  fetchSimilarList,
  searchQuery,
} from "./api";

async function determineFetch(route, page) {
  try {
    switch (route[1]) {
      case "similar":
        return await fetchSimilarList(route[0], route[2], page);

      case "production":
        return await fetchListByCompany(route[0], route[2], page);

      case "search":
        return await searchQuery(route[0], route[1], page);

      default:
        return await fetchList(route[0], route[1], page);
    }
  } catch (err) {
    return new Error(err);
  }
}

export function useFetchList(initial, route, totalPages) {
  const [page, setPage] = useState(1);
  const [list, setList] = useState(initial);

  let spin = page !== totalPages;

  const fetchNextPage = () => {
    if (spin) {
      setPage((prev) => {
        determineFetch(route, prev + 1)
          .then((data) => {
            console.log("Next page:", data);
            setList((prev) => [...prev, ...data.results]);
          })
          .catch((err) => console.log(err));
        return prev + 1;
      });
    }
  };

  return { list, fetchNext: fetchNextPage, spin: spin };
}
