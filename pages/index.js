import { useRouter } from "next/dist/client/router";
import Head from "next/head";

export default function Home() {
  const router = useRouter();

  const handleShow = (useShow) => {
    switch (useShow) {
      case "movie":
        router.push(useShow);
        break;
      case "tv":
        router.push(useShow);
        break;
      default:
        router.push("movie");
    }
  };

  return (
    <>
      <Head>
        <title>HOTPOPTIME</title>
        <meta name="description" content="A Place for Movie Seekers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
}
