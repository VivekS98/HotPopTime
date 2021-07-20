import { useRouter } from "next/router";
import {
  fetchList,
  fetchListByCompany,
  fetchSimilarList,
  searchQuery,
} from "../utils/api";

async function determineFetch(genre, id, type, page) {
  try {
    switch (genre) {
      case "similar":
        return await fetchSimilarList(type, id, page);
      case "production":
        return await fetchListByCompany(type, id, page);
      case "search":
        return await searchQuery(type, id, page);
      default:
        return await fetchList(type, genre, page);
    }
  } catch (err) {
    return new Error(err);
  }
}

export function useLazySwr(genre, id, type, page) {
  const router = useRouter();
  const { data, error } = useSWR(
    `${router.pathname}/${id}`,
    async () => await determineFetch(genre, id, type, page)
  );

  return {
    data,
    error,
    isLoading: !error && !data,
    isError: error,
  };
}

export default function Page({ genre, id, type, page }) {
  const { data, error, isLoading, isError } = useLazySwr(genre, id, type, page);

  if (data) {
    return <></>;
  }
}
