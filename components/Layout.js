import Head from "next/head";

export default function Layout({ children }) {
  return (
    <div className="bg-default text-white">
      <Head>
        <title>HotPopTime</title>
      </Head>
      <header className="p-3 flex flex-row justify-between items-center md:p-6">
        <span className="font-modak text-4xl text-[gold] md:text-5xl">
          HOTPOPTIME
        </span>
        <button className="px-4 py-2 rounded-md ring-2 ring-white transition duration-200 md:px-4 md:py-2 md:text-lg hover:bg-white hover:text-opposite active:ring-0 active:bg-default active:text-white">
          {"Movie"}
        </button>
      </header>
      <div className="font-default">{children}</div>
    </div>
  );
}
