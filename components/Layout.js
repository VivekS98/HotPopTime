import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Layout({ children }) {
  const [header, setHeader] = useState("flex");
  const router = useRouter();

  const [state, setState] = useState("Movies");

  const handleClick = () => {
    console.log(router.pathname);
    if (state === "Movies") {
      setState("TV");
      router.push("/tv");
    } else {
      setState("Movies");
      router.push("/");
    }
  };

  useEffect(() => {
    if (router.pathname.includes("/info")) {
      if (router.pathname.includes("/movie")) {
        setState("Movies");
      } else if (router.pathname.includes("/tv")) {
        setState("TV");
      }
      setHeader("hidden");
    } else {
      setHeader("flex");
      switch (router.pathname) {
        case "/":
          return "Movies";
        case "/tv":
          return "TV";
        default:
          return "Movies";
      }
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
          onClick={() => handleClick()}
          className="px-2 py-1 text-base rounded-md ring-2 ring-white transition duration-200 md:px-4 md:py-2 md:text-xl hover:bg-white hover:text-opposite active:bg-default active:text-white"
        >
          {state}
        </button>
      </header>
      <div className="font-default">{children}</div>
    </div>
  );
}
