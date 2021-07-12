import Head from "next/head";

export default function Layout({ children }) {
  return (
    <div className="bg-default text-white">
      <Head>
        <title>HotPopTime</title>
      </Head>
      <header className="p-4 flex flex-row justify-between items-center">
        <span className="font-modak text-4xl text-yellow-400 md:text-5xl">
          HOTPOPTIME
        </span>
        <button className="px-4 py-2 rounded-md ring-2 text-lg ring-white transition duration-200 hover:bg-white hover:text-opposite active:bg-default active:text-white">
          {"Movie"}
        </button>
      </header>
      <div className="font-default">{children}</div>
    </div>
  );
}
