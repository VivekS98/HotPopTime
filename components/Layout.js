import { useRouter } from "next/router";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { ShowContext } from "../utils/api";

export default function Layout({ children }) {
  const [header, setHeader] = useState("flex");
  const { show, setShow } = useContext(ShowContext);
  const router = useRouter();

  useEffect(() => {
    if (router.pathname.includes("/info")) {
      setHeader("hidden");
    } else {
      setHeader("flex");
    }
  }, [router.pathname]);

  return (
    <div className="bg-default text-white cursor-default min-h-screen">
      <Head>
        <title>HotPopTime</title>
      </Head>
      <header
        className={`p-3 ${header} flex-row justify-between items-center md:p-6`}
      >
        <span className="font-modak text-4xl text-[gold] md:text-5xl">
          HOTPOPTIME
        </span>
        <button
          onClick={() => setShow()}
          className="px-2 py-1 text-base rounded-md ring-2 ring-white transition duration-200 md:px-4 md:py-2 md:text-xl hover:bg-white hover:text-opposite active:bg-default active:text-white"
        >
          {show}
        </button>
      </header>
      <div className="font-default">{children}</div>
    </div>
  );
}
