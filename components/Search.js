import { useRouter } from "next/dist/client/router";
import { useState } from "react";

function SearchComponent() {
  const [state, setState] = useState("");
  const router = useRouter();

  const type = router.asPath.includes("/tv") ? "tv" : "movie";
  const placeholder = type === "tv" ? "TV Show" : "Movies";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.length > 1) {
      router.push({
        pathname: "/list/[...items]",
        query: { items: [type, "search"], query: state, page: "1" },
      });
    }
  };
  const handleChange = (e) => {
    setState(e.target.value);
  };
  return (
    <form
      className="bg-gray-700 flex flex-row flex-nowrap justify-between items-center h-12 w-80 p-2 rounded-full"
      onSubmit={handleSubmit}
    >
      <input
        className="h-11 w-72 outline-none text-lg bg-transparent"
        placeholder={`Search ${placeholder}`}
        type="text"
        value={state}
        onChange={handleChange}
      />
      <div
        className="p-2 rounded-full transition-gpu duration-200 hover:bg-gray-800"
        onClick={handleSubmit}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </form>
  );
}

export default function Search() {
  const [view, setView] = useState(false);

  return (
    <>
      <div className="hidden md:block">
        <SearchComponent />
      </div>
      <div className="static">
        <div
          className="p-2 rounded-full bg-gray-700 md:hidden"
          onClick={() => setView((prev) => !prev)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        {view && (
          <div className="absolute p-2 inset-x-0 top-0 bg-default bg-opacity-70 flex items-center">
            <SearchComponent />
            <div onClick={() => setView((prev) => !prev)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
