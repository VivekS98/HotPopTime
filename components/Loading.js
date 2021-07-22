export default function Loading() {
  return (
    <div className="w-screen h-screen bg-default fixed flex flex-col justify-center items-center">
      <svg
        className="animate-spin h-10 w-10 rounded-full border-r-2 mb-3 border-gray-300 md:w-14 md:h-14 md:border-r-4"
        viewBox="0 0 24 24"
      ></svg>
      <span className="animate-pulse font-modak text-4xl text-[gold] md:text-5xl">
        HOTPOPTIME
      </span>
    </div>
  );
}
