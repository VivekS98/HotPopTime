import Head from "next/head";
const type = "";

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>HotPopTime</title>
      </Head>
      <header className="App-header navbar navbar-expand-lg">
        <span className="logo">HOTPOPTIME</span>
        <div className="dropdown px-2">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {type === "movie" ? "Movies" : "TV"}
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li className="dropdown-item" onClick={() => handleShow("movie")}>
              Movies
            </li>
            <li className="dropdown-item" onClick={() => handleShow("tv")}>
              TV
            </li>
          </ul>
        </div>
      </header>
      {children}
    </div>
  );
}
