import { galleryImages } from "../../constants";

import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motion";

const Gallery = () => {
  const columns = [[], [], [], []];
  galleryImages.forEach((image, index) => {
    columns[index % 4].push(image);
  });

  return (
    <section className="text-black mb-20">
      <motion.div
        variants={fadeIn("down", 0.2)}
        initial="hidden"
        whileInView="show"
        className="flex flex-col text-center px-5 gap-4 mb-4"
      >
        <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl">Gallery</h1>
        <p className="text-[15px] text-gray-500 sm:text-[18px] lg:text-[20px]">
          Explore our fresh chicken distribution and quality service offerings.
        </p>
      </motion.div>
      <motion.div
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView="show"
        className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4"
      >
        {columns.map((column, colIndex) => (
          <div key={colIndex} className="grid gap-4">
            {column.map((image) => (
              <div key={image.id}>
                <img
                  className="w-full rounded-xl shadow"
                  src={image.image}
                  alt={`Gallery ${image.id + 1}`}
                />
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default Gallery;
