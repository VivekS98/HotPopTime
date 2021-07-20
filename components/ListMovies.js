import BottomScrollListener from "react-bottom-scroll-listener";

export default function ListMovies({ genre, id, type }) {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  return <BottomScrollListener onBottom={() => {}}></BottomScrollListener>;
}
