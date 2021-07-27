import useSWR from "swr";
import {
  fetchList,
  fetchListByCompany,
  fetchSimilarList,
  searchQuery,
} from "./api";

async function determineFetch(route, page, query) {
  try {
    switch (route[1]) {
      case "similar":
        return await fetchSimilarList(route[0], route[2], page);

      case "production":
        return await fetchListByCompany(route[0], route[2], page);

      case "search":
        return await searchQuery(route[0], query, page);

      default:
        return await fetchList(route[0], route[1], page);
    }
  } catch (err) {
    return new Error(err);
  }
}

export function useFetchList(route, pathname) {
  const { data, error } = useSWR(pathname, async () => {
    try {
      return await determineFetch(route.items, route.page, route.query);
    } catch (err) {
      return new Error(err);
    }
  });

  let list = [];
  let page = null;
  let total = null;

  if (error) {
    console.log(error);
  }

  if (data) {
    list = data.results;
    page = data.page;
    total = data.total_pages;
  }

  let spin = !error && !data;

  return { list, page, total, isLoading: spin };
}
