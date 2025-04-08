import { reviews } from "../constants";

const Reviews = () => {
  return (
    <section className="mx-5 my-10">
      <div className="flex flex-col text-center px-5 gap-4 mb-4">
        <h2 className="text-2xl font-bold md:text-3xl lg:text-4xl">
          Customer Reviews
        </h2>
        <p className="text-[15px] text-gray-500 sm:text-[18px] lg:text-[20px">
          See what our clients say about our fresh chicken delivery service.
        </p>
      </div>

      <div
        className="overflow-x-hidden hover:overflow-x-auto mx-5 transition-all duration-300"
        style={{ scrollbarGutter: "stable" }}
      >
        <div
          className="grid gap-10 grid-flow-col auto-cols-[minmax(300px,_1fr)] md:auto-cols-[minmax(500px,_1fr)] 
        mb-2"
        >
          {reviews.map((content) => (
            <div className="max-w-md mx-auto bg-gray-50/60 rounded-xl shadow-md overflow-hidden">
              <div className="md:flex">
                <div className="md:shrink-0">
                  <img
                    src={content.images}
                    alt={content.name}
                    className="h-48 w-full object-cover object-center md:h-full md:w-48"
                  />
                </div>
                <div className="py-4 px-5">
                  <h1 className="text-gray-900 font-semibold text-xl">
                    {content.name}{" "}
                  </h1>
                  <h2 className="text-gray-500 text-[15px] mb-2">
                    {content.place}
                  </h2>
                  <p className="text-gray-700 text-base mb-4">
                    {content.reviews}
                  </p>
                  <div className="text-yellow-500 text-lg mt-2">★★★★★</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
