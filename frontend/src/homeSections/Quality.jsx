import { deliverDescription } from "../constants";

import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";

const Quality = () => {
  return (
    <section className="flex flex-col h-full w-full justify-center text-black">
      <motion.div
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView="show"
        className="flex flex-col text-center px-5 gap-4 mb-4"
      >
        <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl">
          Quality Chicken Delivery
        </h1>
        <p className="text-[15px] text-gray-500 sm:text-[18px] lg:text-[20px]">
          Delivering fresh, premium-quality chicken to restaurants and food
          service providers in Metro Manila.
        </p>
      </motion.div>
      <div className="px-8 py-5 text-black grid gap-5 md:grid-cols-2 lg:gap-8">
        {deliverDescription.map((items) => (
          <motion.div
            variants={fadeIn("up", 0.1)}
            initial="hidden"
            whileInView="show"
            key={items.id}
            className="h-[180px] md:h-48 lg:h-64 relative rounded-xl overflow-hidden group transition-all duration-300"
          >
            <img
              className="h-full w-full object-cover"
              src={items.images}
              alt={items.title}
            />

            <div
              className="absolute -bottom-full right-0 text-white w-full h-full 
              bg-gradient-to-t from-black/80 to-gray-600/50
              flex flex-col justify-center items-center p-5 gap-2 
              transition-all duration-300 group-hover:bottom-0"
            >
              <h1 className="text-2xl font-bold lg:text-3xl">{items.title}</h1>
              <p className="text-[15px] lg:text-base text-center">
                {items.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Quality;
