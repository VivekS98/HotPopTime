import Head from "next/head";

export default function Layout({ children }) {
  return (
    <div className="bg-default text-white">
      <Head>
        <title>HotPopTime</title>
      </Head>
      <header className="p-4 flex flex-row justify-between items-center md:px-8 md:py-4">
        <span className="font-modak text-4xl text-[gold] md:text-5xl">
          HOTPOPTIME
        </span>
        <button className="px-2 py-1 rounded-md ring-2 ring-white transition duration-200 md:px-4 md:py-2 md:text-lg hover:bg-white hover:text-opposite">
          {"Movie"}
        </button>
      </header>
      <div className="font-default">{children}</div>
    </div>
  );
}
