import { useState, useEffect } from "react";
import MovieCard from "../movie-card";
import { useHistory, useParams } from "react-router-dom";
import { fetchList, searchQuery, fetchSimilarList } from "../../service/api";

export default function MovieList({ propType, fetchType }) {
  const [genre, setGenre] = useState([]);
  const [fetcher, setFetchType] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const history = useHistory();
  const { id, type, string, year } = useParams();

  let list = null;

  useEffect(() => {
    if (fetchType === "search") {
      searchQuery(type, string, page, year)
        .then((data) => {
          setGenre([...genre, ...data.results]);
          setTotalPages(data.total_pages);
          setFetchType("Results");
          console.log(data);
        })
        .catch((err) => console.log(err));
    } else if (fetchType === "similar") {
      fetchSimilarList(type, id, "en-US", page)
        .then((data) => {
          setGenre([...genre, ...data.results]);
          setTotalPages(data.total_pages);
          setFetchType("Similar");
          console.log(data);
        })
        .catch((err) => console.log(err));
    } else {
      fetchList(type, fetchType, "en-US", page)
        .then((data) => {
          setGenre([...genre, ...data.results]);
          setTotalPages(data.total_pages);
          switch (fetchType) {
            case "popular":
              setFetchType("Popular");
              break;
            case "now_playing":
              setFetchType("Now Playing");
              break;
            case "top_rated":
              setFetchType("Top Rated");
              break;
            case "upcoming":
              setFetchType("Upcoming");
              break;
            default:
              setFetchType(null);
          }
          console.log(data);
        })
        .catch((err) => console.log(err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  if (genre) {
    list = genre.map((val, ind) => {
      return <MovieCard key={ind} type={type} movie={val} />;
    });
  }

  const showContent = () => {
    if (propType === "row") {
      return (
        <>
          <h2 className="text-white ml-3">{fetcher}</h2>
          <div className="movie-list d-flex flex-row overflow-auto">
            {list}
            <div
              className="movie-card text-center text-secondary d-flex flex-column justify-content-center align-items-center"
              onClick={() => handleClick()}
            >
              <b style={{ padding: "100px" }}>More</b>
            </div>
          </div>
        </>
      );
    } else if (propType === "full") {
      return (
        <>
          <h2 className="text-white ml-3">{fetcher}</h2>
          <div className="movie-title d-flex flex-row flex-wrap justify-content-center">
            {list}
            {page !== totalPages ? (
              <div
                className="movie-card text-center text-secondary d-flex flex-column justify-content-center align-items-center"
                onClick={page === totalPages ? null : () => setPage(page + 1)}
              >
                <b style={{ padding: "100px" }}>More</b>
              </div>
            ) : null}
          </div>
        </>
      );
    }
  };

  const handleClick = () => {
    router.push(`/${type}/${fetchType}`);
  };

  return <>{showContent()}</>;
}
