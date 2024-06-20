"use client";
import Head from "next/head";
import { ReactNode, useEffect, useState } from "react";
import Search from "./Search";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Loading from "./Loading";
import { Router } from "next/router";
import Link from "next/link";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  const [header, setHeader] = useState("flex");

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const type = params.get("type");

  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  const handleClick = () => {
    if (type === "tv") {
      router.push("/");
    } else {
      router.push("/?type=tv");
    }
  };

  useEffect(() => {
    if (pathname.includes("/info")) {
      setHeader("hidden");
    } else {
      setHeader("flex");
    }
  }, [pathname, type]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-default flex flex-col justify-between text-white cursor-default">
      <Head>
        <title>HotPopTime</title>
        <meta property="og:title" content="HOTPOPTIME" key="title" />
        <meta
          name="description"
          content="A Place for Movie Seekers"
          key="description"
        />
        <link rel="icon" href="/logo.jpg" />
        <meta
          name="google-site-verification"
          content="7sZpLysoKU82i6xDWbR8mSoqwViic_1K42lA8Tt9fto"
        />
      </Head>
      <header
        className={`p-3 ${header} flex-row justify-between items-center md:p-6`}
      >
        <Link
          className="font-modak text-3xl sm:text-4xl text-[gold] md:text-5xl"
          href="/"
        >
          HOTPOPTIME
        </Link>
        <Search />
        <button
          onClick={handleClick}
          className="px-2 py-1 text-base rounded-md ring-2 ring-white transition duration-200 md:px-4 md:py-2 md:text-xl hover:bg-white hover:text-opposite active:bg-default active:text-white"
        >
          {type === "tv" ? "TV" : "Movies"}
        </button>
      </header>
      <div className="font-default">{children}</div>
      <footer className="m-0 flex flex-col justify-between">
        <hr className="mt-3 mx-5 md:mx-16 md:mt-5" />
        <span className="font-modak m-2 sm:m-4 text-3xl sm:text-4xl leading-none text-[gold] md:text-5xl md:leading-none">
          HOTPOPTIME
        </span>
        <div className="text-center my-2 sm:my-4">
          <h3 className="text-lg font-semibold inline-block md:text-xl">
            Crafted by:
          </h3>
          <a
            className="ml-2 text-lg font-semibold transform-gpu duration-200 text-[gold] md:text-xl hover:text-yellow-400"
            href="https://vkcodes.com"
            rel="noreferrer"
            target="_blank"
          >
            VKcodes
          </a>
        </div>
        <div className="text-center">
          <h3 className="text-sm sm:text-base">
            © All Rights Reserved {new Date().getFullYear()}
          </h3>
        </div>
      </footer>
    </div>
  );
}
