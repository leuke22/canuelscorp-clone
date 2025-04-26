import { reviews } from "../../constants";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import { Pagination } from "swiper/modules";

import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motion";

const Reviews = () => {
  return (
    <section className="mx-5 my-10 text-black">
      <motion.div
        variants={fadeIn("down", 0.2)}
        initial="hidden"
        whileInView="show"
        className="flex flex-col text-center px-5 gap-4 mb-4"
      >
        <h2 className="text-2xl font-bold md:text-3xl lg:text-4xl">
          Customer Reviews
        </h2>
        <p className="text-[15px] text-gray-500 sm:text-[18px] lg:text-[20px]">
          See what our clients say about our fresh chicken delivery service.
        </p>
      </motion.div>

      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 1 },
          1024: { slidesPerView: 2 },
        }}
        modules={[Pagination]}
        className="reviewsSwiper"
      >
        {reviews.map((content, idx) => (
          <SwiperSlide
            key={`${content.id}-${idx}`}
            className="max-w-md mx-auto bg-gray-50/60 rounded-xl shadow-md overflow-hidden mb-5"
          >
            <motion.div
              variants={fadeIn("right", 0.2)}
              initial="hidden"
              whileInView="show"
              className="md:flex"
            >
              <div className="md:shrink-0">
                <img
                  src={content.images}
                  alt={content.name}
                  className="h-48 w-full object-cover object-center md:h-full md:w-48"
                />
              </div>
              <div className="py-4 px-5">
                <h1 className="text-gray-900 font-semibold text-xl">
                  {content.name}
                </h1>
                <h2 className="text-gray-500 text-[15px] mb-2">
                  {content.place}
                </h2>
                <p className="text-gray-700 text-base mb-4">
                  {content.reviews}
                </p>
                <div className="text-yellow-500 text-lg mt-2">★★★★★</div>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Reviews;
