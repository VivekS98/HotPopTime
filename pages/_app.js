import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import "../styles/globals.css";
import { ShowContext } from "../utils/api";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [show, setShow] = useState(
    router.pathname.includes("/tv") ? "TV" : "Movies"
  );

  const setCurrentShow = () => {
    setShow((prev) => {
      if (prev === "Movies") {
        router.push("/tv");
        return "TV";
      } else {
        router.push("/");
        return "Movies";
      }
    });
  };

  useEffect(() => {
    const start = () => {
      console.log("start");
      setLoading(true);
    };
    const end = () => {
      console.log("findished");
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

  return (
    <ShowContext.Provider value={{ show, setShow: setCurrentShow }}>
      {loading ? (
        <div className="w-screen h-screen bg-default fixed flex flex-col justify-center items-center">
          <svg
            className="animate-spin h-10 w-10 rounded-full border-r-2 mb-3 border-gray-300 md:w-14 md:h-14 md:border-r-4"
            viewBox="0 0 24 24"
          ></svg>
          <span className="animate-pulse font-modak text-4xl text-[gold] md:text-5xl">
            HOTPOPTIME
          </span>
        </div>
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </ShowContext.Provider>
  );
}

export default MyApp;
