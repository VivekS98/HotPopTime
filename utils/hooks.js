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

export async function getFetchList(route) {
  const data = await determineFetch(route.items, route.page, route.query);

  let list = [];
  let page = null;
  let total = null;
  if (data) {
    list = data.results;
    page = data.page;
    total = data.total_pages;
  }

  return { list, page, total };
}
