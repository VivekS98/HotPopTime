import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Loading from "../components/Loading";
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
        <Loading />
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </ShowContext.Provider>
  );
}

export default MyApp;
