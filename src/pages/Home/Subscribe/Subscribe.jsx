import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const Subscribe = () => {
  return (
    <div>
      <SectionTitle heading={"Newsletter Subscription"}></SectionTitle>
      <div className="my-5 relative flex flex-col items-center justify-center overflow-hidden  p-8 sm:p-12">
        <div className="w-full max-w-4xl rounded-md border-2 border-gray-200 bg-white p-14">
          <div className="flex flex-col items-center">
            <span className="-rotate-1 rounded-lg bg-yellow-100 py-px px-2 text-sm text-yellow-800">
              Hurry Up!!!
            </span>
            <h3 className="mt-2 max-w-2xl text-center text-2xl font-bold leading-tight sm:text-3xl md:text-4xl md:leading-tight">
              Want to know get notified about new pets? Then just subscribe
            </h3>
            <form
              action=""
              className="mx-auto mt-4 flex w-full max-w-md flex-col gap-3 sm:flex-row sm:gap-0"
            >
              <input
                type="email"
                name="email"
                id="email"
                className="grow rounded border-2 border-gray-300 py-3 px-3 focus:border-emerald-500 focus:outline-none sm:rounded-l-md sm:rounded-r-none sm:border-r-0"
                placeholder="Email Address"
              />
              <button
                type="submit"
                className="rounded bg-black px-5 py-4 font-bold text-white sm:rounded-l-none sm:rounded-r-md"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
